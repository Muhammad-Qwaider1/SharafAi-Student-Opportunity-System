<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Assessment;
use App\Models\Question;
use App\Models\Option;
use App\Models\UserAttempt;
use App\Models\Answer;
use App\Models\ResultMapping;
use App\Models\VerificationCode;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Users
        |--------------------------------------------------------------------------
        */
        $user1 = User::create([
            'name' => 'Ahmad',
            'email' => 'ahmad@test.com',
            'password' => Hash::make('password'),
            'type' => 'student',
        ]);
        $user2 = User::create([
            'name' => 'Sara',
            'email' => 'test@test.com',
            'password' => Hash::make('password'),
            'type' => 'student',
        ]);
        /*
        |--------------------------------------------------------------------------
        | Assessments
        |--------------------------------------------------------------------------
        */
        $assessment1 = Assessment::create([
            'titleAr' => 'الهندسة والتكنولوجيا',
            'title' => "Engineering & Technology",
            'description' => 'Basic personality assessment',
            'status' => 'active',
        ]);
        $assessment2 = Assessment::create([
            'titleAr' => 'العلوم الطبية والصحية',
            'title' => "Medical & Health Sciences",
            'description' => 'Career orientation test',
            'status' => 'active',
        ]);
        $assessment3 = Assessment::create([
            'titleAr' => 'العلوم الإدارية والاقتصادية',
            'title' => "Business & Economics",
            'description' => 'Basic personality assessment',
            'status' => 'active',
        ]);
        $assessment4 = Assessment::create([
            'titleAr' => 'الفنون والتصميم',
            'title' => "Arts & Design",
            'description' => 'Career orientation test',
            'status' => 'active',
        ]);
        $assessment5 = Assessment::create([
            'titleAr' => 'العلوم الإنسانية والاجتماعية',
            'title' => "Humanities & Social Sciences",
            'description' => 'Basic personality assessment',
            'status' => 'active',
        ]);
        /*
        |--------------------------------------------------------------------------
        | Questions
        |--------------------------------------------------------------------------
        */
        $question2 = Question::create([
            'assessment_id' => $assessment2->id,
            'text' => 'Are you interested in understanding how the human body works?',
            'textAr' => 'هل أنت مهتم بفهم كيفية عمل جسم الإنسان؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        $opt1_q2 = Option::create(['question_id' => $question2->id, 'label' => 'Highly Interested', 'labelAr' => 'مهتم جداً', 'score_value' => 5, 'tag' => 'Medical']);
        $opt2_q2 = Option::create(['question_id' => $question2->id, 'label' => 'Somewhat Interested', 'labelAr' => 'مهتم نوعاً ما', 'score_value' => 3, 'tag' => 'Medical']);
        $opt3_q2 = Option::create(['question_id' => $question2->id, 'label' => 'Neutral', 'labelAr' => 'محايد', 'score_value' => 1, 'tag' => 'General']);
        $opt4_q2 = Option::create(['question_id' => $question2->id, 'label' => 'Not Interested', 'labelAr' => 'غير مهتم تماماً', 'score_value' => 0, 'tag' => 'General']);
        $question7 = Question::create([
            'assessment_id' => $assessment2->id,
            'text' => 'How do you feel about working in hospitals or fast-paced medical environments?',
            'textAr' => 'ما هو شعورك تجاه العمل في المستشفيات أو البيئات الطبية السريعة؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        Option::create(['question_id' => $question7->id, 'label' => 'Very comfortable and motivated', 'labelAr' => 'مرتاح جداً ومتحمس', 'score_value' => 5, 'tag' => 'Clinical']);
        Option::create(['question_id' => $question7->id, 'label' => 'I can adapt to it', 'labelAr' => 'يمكنني التكيف مع الوضع', 'score_value' => 3, 'tag' => 'Clinical']);
        Option::create(['question_id' => $question7->id, 'label' => 'I prefer quieter research labs', 'labelAr' => 'أفضل مختبرات الأبحاث الأكثر هدوءاً', 'score_value' => 2, 'tag' => 'Research']);
        Option::create(['question_id' => $question7->id, 'label' => 'I cannot handle medical environments', 'labelAr' => 'لا أتحمل البيئات الطبية أبداً', 'score_value' => 0, 'tag' => 'Non_Medical']);
        $question8 = Question::create([
            'assessment_id' => $assessment2->id,
            'text' => 'Do you enjoy reading about diseases, treatments, and biological discoveries?',
            'textAr' => 'هل تستمتع بالقراءة عن الأمراض، العلاجات، والاكتشافات البيولوجية؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        Option::create(['question_id' => $question8->id, 'label' => 'Always follow latest health updates', 'labelAr' => 'أتابع دائماً أحدث المستجدات الصحية', 'score_value' => 5, 'tag' => 'Medical_Research']);
        Option::create(['question_id' => $question8->id, 'label' => 'Occasionally out of curiosity', 'labelAr' => 'أحياناً من باب الفضول', 'score_value' => 3, 'tag' => 'General_Science']);
        Option::create(['question_id' => $question8->id, 'label' => 'Only if required for study', 'labelAr' => 'فقط إذا كان مطلوباً للدراسة', 'score_value' => 1, 'tag' => 'Routine']);
        Option::create(['question_id' => $question8->id, 'label' => 'I avoid reading about these topics', 'labelAr' => 'أتجنب القراءة في هذه المواضيع', 'score_value' => 0, 'tag' => 'General']);
        $question3 = Question::create([
            'assessment_id' => $assessment3->id,
            'text' => 'Do you enjoy organizing tasks and leading group projects?',
            'textAr' => 'هل تستمتع بتنظيم المهام وقيادة المشاريع الجماعية؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        $opt1_q3 = Option::create(['question_id' => $question3->id, 'label' => 'Always prefer leading', 'labelAr' => 'أفضل القيادة دائماً', 'score_value' => 5, 'tag' => 'Management']);
        $opt2_q3 = Option::create(['question_id' => $question3->id, 'label' => 'I can lead if needed', 'labelAr' => 'يمكنني القيادة عند الحاجة', 'score_value' => 3, 'tag' => 'Management']);
        $opt3_q3 = Option::create(['question_id' => $question3->id, 'label' => 'I prefer to follow instructions', 'labelAr' => 'أفضل اتباع التعليمات فقط', 'score_value' => 1, 'tag' => 'Routine']);
        $opt4_q3 = Option::create(['question_id' => $question3->id, 'label' => 'I dislike group projects', 'labelAr' => 'لا أحب المشاريع الجماعية', 'score_value' => 0, 'tag' => 'Individual']);
        $question9 = Question::create([
            'assessment_id' => $assessment3->id,
            'text' => 'How interested are you in financial markets, investments, and global trade?',
            'textAr' => 'ما مدى اهتمامك بالأسواق المالية، الاستثمارات، والتجارة العالمية؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        Option::create(['question_id' => $question9->id, 'label' => 'Very interested, I track business news', 'labelAr' => 'مهتم جداً، وأتابع أخبار الأعمال', 'score_value' => 5, 'tag' => 'Finance']);
        Option::create(['question_id' => $question9->id, 'label' => 'I understand basics and like investing', 'labelAr' => 'أفهم الأساسيات وأحب الاستثمار', 'score_value' => 3, 'tag' => 'Finance']);
        Option::create(['question_id' => $question9->id, 'label' => 'I only care about personal savings', 'labelAr' => 'يهمني فقط الادخار الشخصي', 'score_value' => 2, 'tag' => 'Analytical']);
        Option::create(['question_id' => $question9->id, 'label' => 'Not interested in finance at all', 'labelAr' => 'غير مهتم بالأمور المالية والبورصة', 'score_value' => 0, 'tag' => 'General']);
        $question10 = Question::create([
            'assessment_id' => $assessment3->id,
            'text' => 'Do you enjoy analyzing business data to find ways to increase profits?',
            'textAr' => 'هل تستمتع بتحليل بيانات الأعمال لإيجاد طرق لزيادة الأرباح؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        Option::create(['question_id' => $question10->id, 'label' => 'I love analyzing figures and data', 'labelAr' => 'أعشق تحليل الأرقام والبيانات التجارية', 'score_value' => 5, 'tag' => 'Economics']);
        Option::create(['question_id' => $question10->id, 'label' => 'I like brain-storming marketing ideas', 'labelAr' => 'أفضل ابتكار أفكار تسويقية', 'score_value' => 4, 'tag' => 'Marketing']);
        Option::create(['question_id' => $question10->id, 'label' => 'I prefer managing office tasks', 'labelAr' => 'أفضل إدارة الأعمال المكتبية والروتينية', 'score_value' => 2, 'tag' => 'Administration']);
        Option::create(['question_id' => $question10->id, 'label' => 'I dislike anything related to commercial sales', 'labelAr' => 'لا أحب أي شيء يتعلق بالمبيعات والتجارة', 'score_value' => 0, 'tag' => 'General']);
        $question4 = Question::create([
            'assessment_id' => $assessment4->id,
            'text' => 'Do you prefer expressing your ideas through visuals and drawings?',
            'textAr' => 'هل تفضل التعبير عن أفكارك من خلال الرسومات والمرئيات؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        $opt1_q4 = Option::create(['question_id' => $question4->id, 'label' => 'Yes, sketches and visuals', 'labelAr' => 'نعم، من خلال الرسومات والمخططات', 'score_value' => 5, 'tag' => 'Creative']);
        $opt2_q4 = Option::create(['question_id' => $question4->id, 'label' => 'Yes, through digital media', 'labelAr' => 'نعم، باستخدام الوسائط الرقمية', 'score_value' => 4, 'tag' => 'Technical_Creative']);
        $opt3_q4 = Option::create(['question_id' => $question4->id, 'label' => 'Sometimes, but I prefer text', 'labelAr' => 'أحياناً، لكني أفضل النصوص والأرقام', 'score_value' => 2, 'tag' => 'Analytical']);
        $opt4_q4 = Option::create(['question_id' => $question4->id, 'label' => 'No, I prefer verbal communication', 'labelAr' => 'لا، أفضل التواصل اللفظي المباشر', 'score_value' => 0, 'tag' => 'Verbal']);
        $question11 = Question::create([
            'assessment_id' => $assessment4->id,
            'text' => 'How much do you care about the aesthetic appearance and colors of your workspace?',
            'textAr' => 'ما مدى اهتمامك بالمظهر الجمالي وتناسق الألوان في بيئتك ومساحتك؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        Option::create(['question_id' => $question11->id, 'label' => 'Very critical, aesthetics matter most', 'labelAr' => 'مهم جداً، المظهر الجمالي يلهمني', 'score_value' => 5, 'tag' => 'Aesthetics']);
        Option::create(['question_id' => $question11->id, 'label' => 'I appreciate good interior layouts', 'labelAr' => 'أقدر الترتيب والتصميم الداخلي الجيد', 'score_value' => 3, 'tag' => 'Design']);
        Option::create(['question_id' => $question11->id, 'label' => 'I only care about functionality', 'labelAr' => 'يهمني فقط الجانب العملي والترتيب', 'score_value' => 1, 'tag' => 'Routine']);
        Option::create(['question_id' => $question11->id, 'label' => 'I do not notice these things at all', 'labelAr' => 'لا أنتبه لهذه التفاصيل الجمالية مطلقاً', 'score_value' => 0, 'tag' => 'General']);
        $question12 = Question::create([
            'assessment_id' => $assessment4->id,
            'text' => 'Do you enjoy creating craftwork, digital layouts, or multimedia content?',
            'textAr' => 'هل تستمتع بإنشاء الأعمال اليدوية، التصاميم الرقمية، أو محتوى الوسائط؟',
            'track' => 'Scientific',
            'weight' => 1,
        ]);
        Option::create(['question_id' => $question12->id, 'label' => 'Yes, I spend free time on creative works', 'labelAr' => 'نعم، أقضي وقت فراغي بالابتكار والأعمال الإبداعية', 'score_value' => 5, 'tag' => 'Creative_Arts']);
        Option::create(['question_id' => $question12->id, 'label' => 'I like editing photos and short videos', 'labelAr' => 'أحب تعديل الصور وإنتاج الفيديوهات القصيرة', 'score_value' => 4, 'tag' => 'Digital_Media']);
        Option::create(['question_id' => $question12->id, 'label' => 'I only like browsing arts without making them', 'labelAr' => 'أحب مشاهدة الفنون فقط دون تطبيقها', 'score_value' => 2, 'tag' => 'General']);
        Option::create(['question_id' => $question12->id, 'label' => 'I completely prefer logical and static work', 'labelAr' => 'أفضل تماماً الأعمال المنطقية أو الجافة', 'score_value' => 0, 'tag' => 'Non_Creative']);
        $question5 = Question::create(['assessment_id' => $assessment5->id, 'text' => 'Are you fascinated by history, cultures, and human behavior?', 'textAr' => 'هل تثير اهتمامك دراسة التاريخ، الثقافات، والسلوك البشري؟', 'track' => 'Scientific', 'weight' => 1,]);
        $opt1_q5 = Option::create(['question_id' => $question5->id, 'label' => 'Fascinated by all of them', 'labelAr' => 'تستهويني جداً كلها', 'score_value' => 5, 'tag' => 'Social']);
        $opt2_q5 = Option::create(['question_id' => $question5->id, 'label' => 'Interested only in history', 'labelAr' => 'مهتم بالتاريخ فقط', 'score_value' => 3, 'tag' => 'History']);
        $opt3_q5 = Option::create(['question_id' => $question5->id, 'label' => 'Interested only in human behavior', 'labelAr' => 'مهتم بسلوك ومشاكل البشر فقط', 'score_value' => 4, 'tag' => 'Behavioral']);
        $opt4_q5 = Option::create(['question_id' => $question5->id, 'label' => 'Not interested in these topics', 'labelAr' => 'لا تهمني هذه المواضيع', 'score_value' => 0, 'tag' => 'General']);
        $question13 = Question::create(['assessment_id' => $assessment5->id, 'text' => 'Do you enjoy resolving social conflicts and listening to people\'s personal struggles?', 'textAr' => 'هل تجد نفسك شغوفاً بحل النزاعات الاجتماعية والاستماع لمشاكل الناس؟', 'track' => 'Scientific', 'weight' => 1,]);
        Option::create(['question_id' => $question13->id, 'label' => 'Yes, I love counseling and helping others', 'labelAr' => 'نعم، أحب تقديم النصح ومساعدة الآخرين إنسانياً', 'score_value' => 5, 'tag' => 'Psychology']);
        Option::create(['question_id' => $question13->id, 'label' => 'I offer help to close friends only', 'labelAr' => 'أقدم المساعدة للأصدقاء المقربين فقط', 'score_value' => 3, 'tag' => 'Social']);
        Option::create(['question_id' => $question13->id, 'label' => 'I prefer observing without intervening', 'labelAr' => 'أفضل المراقبة ودراسة الوضع دون تدخل مباشر', 'score_value' => 2, 'tag' => 'Sociology']);
        Option::create(['question_id' => $question13->id, 'label' => 'I dislike dealing with social emotional issues', 'labelAr' => 'أتحاشى الخوض في مشاكل الناس العاطفية', 'score_value' => 0, 'tag' => 'Individual']);
        $question14 = Question::create(['assessment_id' => $assessment5->id,'text' => 'Do you enjoy reading global literature, philosophies, or political articles?','textAr' => 'هل تستمتع بقراءة الأدب العالمي، الفلسفات، أو المقالات السياسية؟','track' => 'Scientific','weight' => 1,]);
        Option::create(['question_id' => $question14->id, 'label' => 'Highly engaged with philosophy and text', 'labelAr' => 'مهتم جداً بالكتب الفكرية والأدبية', 'score_value' => 5, 'tag' => 'Humanities']);
        Option::create(['question_id' => $question14->id, 'label' => 'I like reading stories and news lines', 'labelAr' => 'أحب قراءة الروايات والقصص ومتابعة الأخبار', 'score_value' => 3, 'tag' => 'Literature']);
        Option::create(['question_id' => $question14->id, 'label' => 'Only if it impacts my general knowledge', 'labelAr' => 'فقط إذا كانت تزيد من ثقافتي العامة', 'score_value' => 2, 'tag' => 'General']);
        Option::create(['question_id' => $question14->id, 'label' => 'I completely prefer scientific formulas', 'labelAr' => 'أفضل تماماً المعادلات العلمية والجافة', 'score_value' => 0, 'tag' => 'Scientific_Only']);
        $question6 = Question::create(['assessment_id' => $assessment1->id, 'text' => 'Do you like solving complex logic puzzles and programming problems?', 'textAr' => 'هل تحب حل الألغاز المنطقية المعقدة ومشاكل البرمجة؟', 'track' => 'Scientific', 'weight' => 1,]);
        $opt1_q6 = Option::create(['question_id' => $question6->id, 'label' => 'I love solving complex puzzles', 'labelAr' => 'أعشق حل الألغاز المعقدة', 'score_value' => 5, 'tag' => 'Logic']);
        $opt2_q6 = Option::create(['question_id' => $question6->id, 'label' => 'I enjoy logical thinking occasionally', 'labelAr' => 'أستمتع بالتفكير المنطقي أحياناً', 'score_value' => 3, 'tag' => 'Logic']);
        $opt3_q6 = Option::create(['question_id' => $question6->id, 'label' => 'I prefer simple straightforward tasks', 'labelAr' => 'أفضل المهام البسيطة والمباشرة', 'score_value' => 1, 'tag' => 'Routine']);
        $opt4_q6 = Option::create(['question_id' => $question6->id, 'label' => 'I completely avoid logic puzzles', 'labelAr' => 'أتجنب الألغاز المنطقية تماماً', 'score_value' => 0, 'tag' => 'Non_Technical']);
        $question15 = Question::create(['assessment_id' => $assessment1->id, 'text' => 'How interested are you in knowing how electrical appliances and machines are built inside?', 'textAr' => 'ما مدى فضولك لمعرفة كيفية صناعة وتركيب الأجهزة الكهربائية والآلات من الداخل؟', 'track' => 'Scientific', 'weight' => 1,]);
        Option::create(['question_id' => $question15->id, 'label' => 'I love dismantling and fixing things', 'labelAr' => 'أحب فك وتصليح الأشياء والآلات المعطلة', 'score_value' => 5, 'tag' => 'Mechanical']);
        Option::create(['question_id' => $question15->id, 'label' => 'I like reading about tech and hardware designs', 'labelAr' => 'أحب القراءة عن التقنيات الحديثة وتصميم العتاد', 'score_value' => 4, 'tag' => 'Hardware']);
        Option::create(['question_id' => $question15->id, 'label' => 'I prefer using devices without knowing how they work', 'labelAr' => 'أكتفي باستخدام الجهاز دون معرفة كواليس صنعه', 'score_value' => 1, 'tag' => 'General']);
        Option::create(['question_id' => $question15->id, 'label' => 'I completely dislike engineering assembly', 'labelAr' => 'لا أطيق التعامل مع الأجهزة والآلات ميكانيكياً', 'score_value' => 0, 'tag' => 'Non_Technical']);
        $question16 = Question::create(['assessment_id' => $assessment1->id, 'text' => 'Do you enjoy designing system architectures or writing automated scripts?', 'textAr' => 'هل تسعد بتخطيط وهيكلة الأنظمة البرمجية أو كتابة الأكواد الآلية؟', 'track' => 'Scientific', 'weight' => 1,]);
        Option::create(['question_id' => $question16->id, 'label' => 'Yes, building scalable software is my passion', 'labelAr' => 'نعم، بناء الأنظمة البرمجية الضخمة هو شغفي', 'score_value' => 5, 'tag' => 'Software_Engineering']);
        Option::create(['question_id' => $question16->id, 'label' => 'I enjoy building websites and simple web applications', 'labelAr' => 'أستمتع بتطوير مواقع الويب والتطبيقات البسيطة', 'score_value' => 4, 'tag' => 'Web_Development']);
        Option::create(['question_id' => $question16->id, 'label' => 'I can write code only when assisted', 'labelAr' => 'يمكنني كتابة الكود بمساعدة وتوجيه مستمر فقط', 'score_value' => 2, 'tag' => 'Technical']);
        Option::create(['question_id' => $question16->id, 'label' => 'I have no patience for coding or algorithms', 'labelAr' => 'ليس لدي صبر على البرمجة وحل المشكلات والخوارزميات', 'score_value' => 0, 'tag' => 'Non_Technical']);

        $attempt1 = UserAttempt::create([
            'user_id' => $user1->id,
            'assessment_id' => $assessment1->id,
            'total_score' => 20,
            'started_at' => now(),
            'completed_at' => now(),
        ]);
        $attempt2 = UserAttempt::create([
            'user_id' => $user2->id,
            'assessment_id' => $assessment1->id,
            'total_score' => 10,
            'started_at' => now(),
            'completed_at' => now(),
        ]);
        ResultMapping::create([
            'tag' => 'extrovert',
            'min_score' => 15,
            'max_score' => 30,
            'recommendation' => 'You are suitable for leadership roles.',
        ]);
        ResultMapping::create([
            'tag' => 'introvert',
            'min_score' => 0,
            'max_score' => 14,
            'recommendation' => 'You are suitable for analytical roles.',
        ]);
        VerificationCode::create([
            'user_id' => $user1->id,
            'code' => '1234',
            'type' => 'reset_password',
            'expires_at' => now()->addMinutes(15),
            'used_at' => null,
        ]);
        VerificationCode::create([
            'user_id' => $user2->id,
            'code' => '5678',
            'type' => 'email_verification',
            'expires_at' => now()->addMinutes(15),
            'used_at' => null,
        ]);
    }
}
