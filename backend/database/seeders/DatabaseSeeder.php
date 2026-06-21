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
            'titleAr'     => 'اختبار الفرص الطلابية',
            'description' => 'Helps students choose their university specialization',
            'status'      => 'active',
        ]);

        // Questions & Options with stream weights
        $questions = [
            // Question 1
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
            // Question 2
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
            // Question 3
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
            // Question 4
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
            // Question 5
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
            // Question 6
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
            // Question 7
            [
                'text'    => 'What type of books or articles do you prefer reading?',
                'text_ar' => 'ما نوع الكتب أو المقالات التي تفضل قراءتها؟',
                'options' => [
                    [
                        'text'    => 'Technology and scientific discoveries',
                        'text_ar' => 'التكنولوجيا والاكتشافات العلمية',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Anatomy, biology, and health wellness',
                        'text_ar' => 'التشريح، علم الأحياء، والصحة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Entrepreneurship, marketing, and leadership',
                        'text_ar' => 'ريادة الأعمال، التسويق، والقيادة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'History, philosophy, or classic literature',
                        'text_ar' => 'التاريخ، الفلسفة، أو الأدب الكلاسيكي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 8
            [
                'text'    => 'If you were given a large budget, what would you do?',
                'text_ar' => 'إذا حصلت على ميزانية كبيرة، ماذا ستفعل بها؟',
                'options' => [
                    [
                        'text'    => 'Invent a new smart device or software',
                        'text_ar' => 'ابتكار جهاز ذكي أو برنامج جديد',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Fund a medical research facility',
                        'text_ar' => 'تمويل منشأة للأبحاث الطبية',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Start a new business or investment firm',
                        'text_ar' => 'تأسيس شركة جديدة أو مؤسسة استثمارية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Open a cultural center or art gallery',
                        'text_ar' => 'افتتاح مركز ثقافي أو معرض فني',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 2],
                    ],
                ],
            ],
            // Question 9
            [
                'text'    => 'In a group project, what is usually your role?',
                'text_ar' => 'في المشاريع الجماعية، ما هو دورك المعتاد؟',
                'options' => [
                    [
                        'text'    => 'The technical expert or data analyst',
                        'text_ar' => 'الخبير التقني أو محلل البيانات',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'The caregiver ensuring everyone is okay',
                        'text_ar' => 'المراعي الذي يتأكد من راحة وسلامة الجميع',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'The leader organizing and strategizing',
                        'text_ar' => 'القائد الذي ينظم ويضع الاستراتيجيات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'The creative mind pitching visual ideas',
                        'text_ar' => 'العقل المبدع الذي يطرح الأفكار والتصاميم',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 0],
                    ],
                ],
            ],
            // Question 10
            [
                'text'    => 'Which tool do you feel most comfortable using?',
                'text_ar' => 'أي أداة تشعر براحة أكبر في استخدامها؟',
                'options' => [
                    [
                        'text'    => 'Calculators and CAD software',
                        'text_ar' => 'الآلات الحاسبة وبرامج التصميم الهندسي',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Microscopes and lab equipment',
                        'text_ar' => 'المجاهر والمعدات المخبرية',
                        'weights' => ['engineering' => 1, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Spreadsheets and financial models',
                        'text_ar' => 'جداول البيانات والنماذج المالية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Paintbrushes, instruments, or drafting tools',
                        'text_ar' => 'فراشي الألوان، الآلات الموسيقية، أو أدوات الكتابة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 2],
                    ],
                ],
            ],
            // Question 11
            [
                'text'    => 'What kind of work environment do you prefer?',
                'text_ar' => 'ما نوع بيئة العمل التي تفضلها؟',
                'options' => [
                    [
                        'text'    => 'A high-tech lab or construction site',
                        'text_ar' => 'مختبر عالي التقنية أو موقع بناء',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'A dynamic clinic or hospital setting',
                        'text_ar' => 'عيادة أو مستشفى مليء بالحركة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'A fast-paced corporate office',
                        'text_ar' => 'مكتب شركة سريع الإيقاع',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'A quiet library, studio, or museum',
                        'text_ar' => 'مكتبة هادئة، استوديو، أو متحف',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 12
            [
                'text'    => 'How do you handle complex information?',
                'text_ar' => 'كيف تتعامل مع المعلومات المعقدة؟',
                'options' => [
                    [
                        'text'    => 'Breaking it down into systems and formulas',
                        'text_ar' => 'تقسيمها إلى أنظمة ومعادلات',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Relating it to biological and organic processes',
                        'text_ar' => 'ربطها بالعمليات العضوية والبيولوجية',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Analyzing it for market trends and profits',
                        'text_ar' => 'تحليلها لمعرفة اتجاهات السوق والأرباح',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Exploring its cultural and philosophical context',
                        'text_ar' => 'استكشاف سياقها الثقافي والفلسفي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 13
            [
                'text'    => 'Which documentary would you most likely watch?',
                'text_ar' => 'أي فيلم وثائقي من المرجح أن تشاهده؟',
                'options' => [
                    [
                        'text'    => 'How mega-structures and machines are built',
                        'text_ar' => 'كيف تُبنى الهياكل والآلات العملاقة',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'The mysteries of the human brain and genetics',
                        'text_ar' => 'أسرار العقل البشري والجينات',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'The rise and fall of giant corporations',
                        'text_ar' => 'صعود وسقوط الشركات الكبرى',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'The history of ancient civilizations and art',
                        'text_ar' => 'تاريخ الحضارات القديمة والفنون',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 14
            [
                'text'    => 'If you had to solve a mystery, what would be your approach?',
                'text_ar' => 'إذا كان عليك حل لغز غامض، فما هو أسلوبك؟',
                'options' => [
                    [
                        'text'    => 'Using strict logic and mathematical deductions',
                        'text_ar' => 'استخدام المنطق الصارم والاستنتاجات الرياضية',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Analyzing physical and forensic evidence',
                        'text_ar' => 'تحليل الأدلة المادية والجنائية',
                        'weights' => ['engineering' => 1, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Following the money trail and motives',
                        'text_ar' => 'تتبع مسار الأموال والدوافع المالية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Interviewing people and understanding psychology',
                        'text_ar' => 'إجراء مقابلات مع الناس وفهم سيكولوجيتهم',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 15
            [
                'text'    => 'What do you consider your strongest skill?',
                'text_ar' => 'ما هي المهارة التي تعتبرها نقطة قوتك؟',
                'options' => [
                    [
                        'text'    => 'Spatial reasoning and mechanics',
                        'text_ar' => 'التفكير المكاني والميكانيكا',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Empathy and memorizing vast scientific data',
                        'text_ar' => 'التعاطف وحفظ البيانات العلمية الواسعة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text'    => 'Negotiation and risk management',
                        'text_ar' => 'التفاوض وإدارة المخاطر',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text'    => 'Communication and creative expression',
                        'text_ar' => 'التواصل والتعبير الإبداعي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 3],
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
