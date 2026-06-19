<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Assessment;
use App\Models\UserAttempt;
use App\Models\Answer;
use App\Models\Option;
use Illuminate\Http\Request;

class AssessmentController extends Controller
{
    // GET /api/assessment/questions
    public function getQuestions()
    {
        $assessment = Assessment::where('status', 'active')->first();

        if (!$assessment) {
            return ApiResponse::error('No active assessment found', 404);
        }

        $questions = $assessment->questions()->with('options')->get();

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
        $request->validate([
            'answers'   => 'required|array',
            'answers.*' => 'required|string',
        ]);

        $assessment = Assessment::where('status', 'active')->first();

        if (!$assessment) {
            return ApiResponse::error('No active assessment found', 404);
        }

        $questions = $assessment->questions()->with('options.streamWeights')->get();

        // حساب الأوزان لكل مسار
        $streams = [
            'engineering' => 0,
            'medical'     => 0,
            'business'    => 0,
            'arts'        => 0,
            'humanities'  => 0,
        ];

        $attempt = UserAttempt::create([
            'user_id'       => $request->user()->id,
            'assessment_id' => $assessment->id,
            'total_score'   => 0,
            'started_at'    => now(),
            'completed_at'  => now(),
        ]);

        foreach ($questions as $index => $question) {
            $questionKey = 'q' . ($index + 1);

            if (!isset($request->answers[$questionKey])) continue;

            $letterAnswer = $request->answers[$questionKey]; // a, b, c, d
            $optionIndex  = ord($letterAnswer) - 97;         // 0, 1, 2, 3
            $option       = $question->options->get($optionIndex);
            if (!$option) continue;
            Answer::create([
                'attempt_id'  => $attempt->id,
                'question_id' => $question->id,
                'option_id'   => $option->id,
            ]);
            
            foreach ($option->streamWeights as $sw) {
                $streams[$sw->stream] += $sw->weight;
            }
        }
       
        $maxScore = max($streams) ?: 1;
        $scores   = [];
        foreach ($streams as $stream => $score) {
            $scores[$stream] = (int) round(($score / $maxScore) * 100);
        }

        $topStream = array_search(max($scores), $scores);
        $attempt->update(['total_score' => max($streams)]);

        // الكليات المقترحة
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
        $attempts = UserAttempt::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $faculties = [
            'engineering' => ['Computer Engineering', 'Software Engineering', 'Electrical Engineering', 'Information Technology'],
            'medical'     => ['Human Medicine', 'Pharmacy', 'Dentistry', 'Nursing'],
            'business'    => ['Business Administration', 'Economics', 'Accounting', 'Marketing'],
            'arts'        => ['Architecture', 'Fine Arts', 'Graphic Design', 'Media Production'],
            'humanities'  => ['Law', 'Languages & Translation', 'History', 'Journalism'],
        ];

        $data = $attempts->map(function ($attempt) use ($faculties) {
            $streams = ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0];

            foreach ($attempt->answers as $answer) {
                foreach ($answer->option->streamWeights as $sw) {
                    $streams[$sw->stream] += $sw->weight;
                }
            }

            $maxScore = max($streams) ?: 1;
            $scores   = [];
            foreach ($streams as $stream => $score) {
                $scores[$stream] = (int) round(($score / $maxScore) * 100);
            }

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