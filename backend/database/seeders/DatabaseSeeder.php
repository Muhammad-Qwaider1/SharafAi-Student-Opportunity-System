<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Assessment;
use App\Models\Question;
use App\Models\Option;
use App\Models\OptionStreamWeight;
use App\Models\ResultMapping;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        User::create([
            'name'     => 'Ahmad',
            'email'    => 'ahmad@test.com',
            'phone'    => '0999999991',
            'password' => Hash::make('password'),
            'type'     => 'student',
            'track'    => 'Scientific',
        ]);

        // Assessment
        $assessment = Assessment::create([
            'title'       => 'Student Opportunity Assessment',
            'description' => 'Helps students choose their university specialization',
            'status'      => 'active',
        ]);

        // Questions & Options with stream weights
        $questions = [
            [
                'text'    => 'Which activity excites you the most?',
                'text_ar' => 'أي نشاط يثير حماسك أكثر؟',
                'options' => [
                    [
                        'text'    => 'Solving a tricky math or logic puzzle',
                        'text_ar' => 'حل لغز رياضي معقد',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Helping someone recover from illness',
                        'text_ar' => 'مساعدة شخص على الشفاء',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Designing a poster or short film',
                        'text_ar' => 'تصميم بوستر أو فيلم قصير',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Debating ideas, history or languages',
                        'text_ar' => 'النقاش في الأفكار واللغات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            [
                'text'    => 'What kind of problems do you enjoy solving?',
                'text_ar' => 'ما نوع المشكلات التي تستمتع بحلها؟',
                'options' => [
                    [
                        'text'    => 'Technical and engineering problems',
                        'text_ar' => 'مشكلات تقنية وهندسية',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Health and human body problems',
                        'text_ar' => 'مشكلات صحية وجسد الإنسان',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Business and financial problems',
                        'text_ar' => 'مشكلات تجارية ومالية',
                        'weights' => ['engineering' => 1, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Social and humanitarian problems',
                        'text_ar' => 'مشكلات اجتماعية وإنسانية',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            [
                'text'    => 'How do you prefer to express yourself?',
                'text_ar' => 'كيف تفضل التعبير عن نفسك؟',
                'options' => [
                    [
                        'text'    => 'Through building or programming',
                        'text_ar' => 'من خلال البناء أو البرمجة',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Through caring and helping others',
                        'text_ar' => 'من خلال الرعاية ومساعدة الآخرين',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Through art and visual design',
                        'text_ar' => 'من خلال الفن والتصميم البصري',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Through writing and storytelling',
                        'text_ar' => 'من خلال الكتابة ورواية القصص',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            [
                'text'    => 'What subject did you enjoy most at school?',
                'text_ar' => 'ما المادة التي استمتعت بها أكثر في المدرسة؟',
                'options' => [
                    [
                        'text'    => 'Mathematics and Physics',
                        'text_ar' => 'الرياضيات والفيزياء',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Biology and Chemistry',
                        'text_ar' => 'الأحياء والكيمياء',
                        'weights' => ['engineering' => 1, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Arts and Music',
                        'text_ar' => 'الفنون والموسيقى',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'History and Languages',
                        'text_ar' => 'التاريخ واللغات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            [
                'text'    => 'Where do you see yourself working in the future?',
                'text_ar' => 'أين ترى نفسك تعمل في المستقبل؟',
                'options' => [
                    [
                        'text'    => 'In a tech company or engineering firm',
                        'text_ar' => 'في شركة تقنية أو هندسية',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'In a hospital or medical center',
                        'text_ar' => 'في مستشفى أو مركز طبي',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'In a creative studio or media agency',
                        'text_ar' => 'في استوديو إبداعي أو وكالة إعلام',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'In a law firm or international organization',
                        'text_ar' => 'في مكتب محاماة أو منظمة دولية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            [
                'text'    => 'What motivates you the most?',
                'text_ar' => 'ما الذي يحفزك أكثر؟',
                'options' => [
                    [
                        'text'    => 'Building something new and innovative',
                        'text_ar' => 'بناء شيء جديد ومبتكر',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Saving lives and improving health',
                        'text_ar' => 'إنقاذ الأرواح وتحسين الصحة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Creating art that touches people',
                        'text_ar' => 'إبداع فن يلامس الناس',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Fighting for justice and rights',
                        'text_ar' => 'النضال من أجل العدالة والحقوق',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
        ];

        foreach ($questions as $index => $q) {
            $question = Question::create([
                'assessment_id'    => $assessment->id,
                'question_text'    => $q['text'],
                'question_text_ar' => $q['text_ar'],
                'category'         => 'general',
                'weight'           => 1,
            ]);

            foreach ($q['options'] as $o) {
                $option = Option::create([
                    'question_id'   => $question->id,
                    'option_text'   => $o['text'],
                    'option_text_ar'=> $o['text_ar'],
                    'score_value'   => array_sum($o['weights']),
                    'tag'           => 'stream',
                ]);

                foreach ($o['weights'] as $stream => $weight) {
                    OptionStreamWeight::create([
                        'option_id' => $option->id,
                        'stream'    => $stream,
                        'weight'    => $weight,
                    ]);
                }
            }
        }

        // Result Mappings
        $mappings = [
            ['tag' => 'engineering', 'min_score' => 0, 'max_score' => 100, 'recommendation' => 'You are suitable for Engineering fields.'],
            ['tag' => 'medical',     'min_score' => 0, 'max_score' => 100, 'recommendation' => 'You are suitable for Medical fields.'],
            ['tag' => 'business',    'min_score' => 0, 'max_score' => 100, 'recommendation' => 'You are suitable for Business fields.'],
            ['tag' => 'arts',        'min_score' => 0, 'max_score' => 100, 'recommendation' => 'You are suitable for Arts fields.'],
            ['tag' => 'humanities',  'min_score' => 0, 'max_score' => 100, 'recommendation' => 'You are suitable for Humanities fields.'],
        ];

        foreach ($mappings as $mapping) {
            ResultMapping::create($mapping);
        }
    }
}