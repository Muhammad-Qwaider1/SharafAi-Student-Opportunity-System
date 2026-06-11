<?php

namespace App\Http\Controllers\Answer;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Service\AnswerService;
use App\Service\UserAttemptService;
use Illuminate\Http\Request;

use function PHPSTORM_META\type;

class AnswerController extends Controller
{
    private $answerService;
    private $userAttemptService;
    public function __construct(AnswerService $answerService, UserAttemptService $userAttemptService)
    {
        $this->answerService = $answerService;
        $this->userAttemptService = $userAttemptService;
    }
    // public function  submitassessments(Request $request)
    // {
    //     $request->validate([
    //         'assessments' => 'required',
    //     ]);
    //     $data = $request->assessments;
    //     $this->userAttemptService->create();
    //     foreach ($data as $key => $value) {
    //         Answer::create([
    //         'attempt_id' => '',
    //         'question_id' => $key,
    //         'option_id' => $value,
    //     ]);
    //     }
    // }
}
