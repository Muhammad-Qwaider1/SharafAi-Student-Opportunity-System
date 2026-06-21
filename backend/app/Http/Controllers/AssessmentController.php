<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Assessment;
use App\Models\UserAttempt;
use App\Models\Answer;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AssessmentController extends Controller
{
    // GET /api/assessment/questions
    public function getQuestions(Request $request)
    {
        Log::info("assessment");
        $assessment = Assessment::where('track', $request->user()->track)->first();
        Log::info($assessment);
        if (!$assessment) {
            return ApiResponse::error('No active assessment found', 404);
        }

        Log::info("questions");
        $questions = $assessment->questions()->with('options')->get();

        Log::info("data");
        $data = $questions->map(function ($question, $index) {
            return [
                'id'       => 'q' . ($index + 1),
                'text'     => $question->question_text,
                'textAr'   => $question->question_text_ar,
                'options'  => $question->options->map(function ($option, $i) {
                    return [
                        'id'      => chr(97 + $i), // a, b, c, d
                        'label'   => $option->option_text,
                        'labelAr' => $option->option_text_ar,

                    ];
                }),
            ];
        });

        return ApiResponse::success($data, 'Questions fetched successfully');
    }

    // POST /api/assessment/submit
    public function submitAssessment(Request $request)
    {
        Log::info("request");
        $request->validate([
            'answers'   => 'required|array',
            'answers.*' => 'required|string',
        ]);

        Log::info("assessment");
        $assessment = Assessment::where('track', $request->user()->track)->first();

        if (!$assessment) {
            return ApiResponse::error('No active assessment found', 404);
        }

        Log::info("questions");
        $questions = $assessment->questions()->with('options.streamWeights')->get();

        // حساب الأوزان لكل مسار
        Log::info("streams");
        $streams = [
            'engineering' => 0,
            'medical'     => 0,
            'business'    => 0,
            'arts'        => 0,
            'humanities'  => 0,
        ];

        Log::info("attempt");
        $attempt = UserAttempt::create([
            'user_id'       => $request->user()->id,
            'assessment_id' => $assessment->id,
            'total_score'   => 0,
            'started_at'    => now(),
            'completed_at'  => now(),
        ]);

        foreach ($questions as $index => $question) {
            Log::info("questionKey");
            $questionKey = 'q' . ($index + 1);

            if (!isset($request->answers[$questionKey])) continue;

            Log::info("letterAnswer");
            $letterAnswer = $request->answers[$questionKey]; // a, b, c, d
            Log::info("optionIndex");
            $optionIndex  = ord($letterAnswer) - 97;         // 0, 1, 2, 3
            Log::info("option");
            $option       = $question->options->get($optionIndex);
            if (!$option) continue;
            Answer::create([
                'attempt_id'  => $attempt->id,
                'question_id' => $question->id,
                'option_id'   => $option->id,
            ]);

            foreach ($option->streamWeights as $sw) {
                Log::info("streams");
                $streams[$sw->stream] += $sw->weight;
            }
        }

        Log::info("maxScore");
        $maxScore = max($streams) ?: 1;
        Log::info("scores");
        $scores   = [];
        foreach ($streams as $stream => $score) {
            Log::info("scores");
            $scores[$stream] = (int) round(($score / $maxScore) * 100);
        }

        Log::info("topStream");
        $topStream = array_search(max($scores), $scores);
        Log::info("attempt");
        $attempt->update(['total_score' => max($streams)]);

        // الكليات المقترحة
        Log::info("faculties");
        $faculties = [
            'engineering' => ['Computer Engineering', 'Software Engineering', 'Electrical Engineering', 'Information Technology'],
            'medical'     => ['Human Medicine', 'Pharmacy', 'Dentistry', 'Nursing'],
            'business'    => ['Business Administration', 'Economics', 'Accounting', 'Marketing'],
            'arts'        => ['Architecture', 'Fine Arts', 'Graphic Design', 'Media Production'],
            'humanities'  => ['Law', 'Languages & Translation', 'History', 'Journalism'],
        ];

        return ApiResponse::success([
            'id'                   => $attempt->id,
            'date'                 => $attempt->completed_at,
            'topStream'            => $topStream,
            'scores'               => $scores,
            'recommendedFaculties' => $faculties[$topStream],
        ], 'Assessment submitted successfully');
    }

    // GET /api/assessment/history
    public function history(Request $request)
    {
        Log::info("attempts");
        $attempts = UserAttempt::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        Log::info("faculties");
            $faculties = [
            'engineering' => ['Computer Engineering', 'Software Engineering', 'Electrical Engineering', 'Information Technology'],
            'medical'     => ['Human Medicine', 'Pharmacy', 'Dentistry', 'Nursing'],
            'business'    => ['Business Administration', 'Economics', 'Accounting', 'Marketing'],
            'arts'        => ['Architecture', 'Fine Arts', 'Graphic Design', 'Media Production'],
            'humanities'  => ['Law', 'Languages & Translation', 'History', 'Journalism'],
        ];

        Log::info("data");
        $data = $attempts->map(function ($attempt) use ($faculties) {
            Log::info("streams");
            $streams = ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0];

            foreach ($attempt->answers as $answer) {
                foreach ($answer->option->streamWeights as $sw) {
                    Log::info("streams");
                    $streams[$sw->stream] += $sw->weight;
                }
            }

            Log::info("maxScore");
            $maxScore = max($streams) ?: 1;
            Log::info("scores");
            $scores   = [];
            foreach ($streams as $stream => $score) {
                Log::info("scores");
                $scores[$stream] = (int) round(($score / $maxScore) * 100);
            }

            Log::info("topStream");
            $topStream = array_search(max($scores), $scores);
            return [
                'id'              => $attempt->id,
                'date'            => $attempt->completed_at,
                'topStream'       => $topStream,
                'matchPercentage' => max($scores),
            ];
        });

        return ApiResponse::success($data, 'History fetched successfully');
    }
}
