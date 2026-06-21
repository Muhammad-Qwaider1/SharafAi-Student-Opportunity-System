<?php

namespace Database\Seeders;

use App\Models\Assessment;
use App\Models\Option;
use App\Models\OptionStreamWeight;
use App\Models\Question;
use App\Models\ResultMapping;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $literaryQuestions = [
            // Question 1
            [
                'text' => 'What type of reading material captures your attention the most?',
                'text_ar' => 'ما نوع المواد القرائية التي تجذب اهتمامك أكثر؟',
                'options' => [
                    [
                        'text' => 'Historical biographies and political analysis',
                        'text_ar' => 'السير التاريخية والتحليلات السياسية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Novels, poetry, and theatrical plays',
                        'text_ar' => 'الروايات، الدواوين الشعرية، والمسرحيات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Articles on economic shifts and marketing tricks',
                        'text_ar' => 'مقالات عن التحولات الاقتصادية وأساليب التسويق',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Psychology articles and human behavior studies',
                        'text_ar' => 'مقالات علم النفس ودراسات السلوك الإنساني',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 2
            [
                'text' => 'If you were to write a book, what would be its main theme?',
                'text_ar' => 'إذا طلب منك تأليف كتاب، فماذا سيكون موضوعه الرئيسي؟',
                'options' => [
                    [
                        'text' => 'A deep dive into ancient civilizations and philosophy',
                        'text_ar' => 'غوص عميق في فلسفات وتاريخ الحضارات القديمة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                    [
                        'text' => 'A fictional story with complex characters and imagery',
                        'text_ar' => 'قصة خيالية تعتمد على عمق الشخصيات والصور البلاغية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'A guide on modern management and building business wealth',
                        'text_ar' => 'دليل حول الإدارة الحديثة وبناء الثروات التجارية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Analyses of social laws and global human rights issues',
                        'text_ar' => 'تحليلات للقوانين الاجتماعية وقضايا حقوق الإنسان العالمية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 3
            [
                'text' => 'Which personal skill do you enjoy developing the most?',
                'text_ar' => 'ما هي المهارة الشخصية التي تستمتع بتطويرها والاعتماد عليها؟',
                'options' => [
                    [
                        'text' => 'Learning new languages and professional translation',
                        'text_ar' => 'تعلم لغات جديدة وإتقان الترجمة الاحترافية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Expressing ideas through visual art, music, or acting',
                        'text_ar' => 'التعبير عن الأفكار بالرسم، الموسيقى، أو الأداء المسرحي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Persuasion, debate, and formulating legal arguments',
                        'text_ar' => 'الإقناع، المناظرة، وصياغة الحجج القانونية والفكرية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 2, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Strategic negotiation, leadership, and project organizing',
                        'text_ar' => 'التفاوض الإستراتيجي، القيادة، وتنظيم المشاريع والفرق',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                ],
            ],
            // Question 4
            [
                'text' => 'What kind of school activities did you look forward to joining?',
                'text_ar' => 'ما هي الأنشطة المدرسية التي كنت تتطلع للمشاركة فيها؟',
                'options' => [
                    [
                        'text' => 'School radio, journalism, and creative writing clubs',
                        'text_ar' => 'الإذاعة المدرسية، الصحافة، وجماعة الإعلام والكتابة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 2, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Theater plays, art galleries, and talent shows',
                        'text_ar' => 'المسرحيات المدرسية، معارض الرسم، وعروض المواهب',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Student council elections, debates, and public speeches',
                        'text_ar' => 'انتخابات البرلمان الطلابي، المناظرات، والخطابة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 2, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Organizing charity events and managing school trips',
                        'text_ar' => 'تنظيم الأسواق الخيرية وإدارة الخدمات اللوجستية للرحلات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                ],
            ],
            // Question 5
            [
                'text' => 'Imagine you are working in a media company. What is your ideal role?',
                'text_ar' => 'إذا أتيحت لك فرصة العمل في مؤسسة إعلامية، ما هو الدور الأنسب لك؟',
                'options' => [
                    [
                        'text' => 'News correspondent or political analyst',
                        'text_ar' => 'مراسل إخباري ميداني أو محلل سياسي للأحداث',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Scriptwriter, novelist, or creative director',
                        'text_ar' => 'كاتب سيناريو، مؤلف قصصي، أو مخرج إبداعي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Public Relations (PR) manager or marketing strategist',
                        'text_ar' => 'مدير علاقات عامة (PR) أو مخطط حملات تسويقية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 1, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Documentary researcher tracking history and cultures',
                        'text_ar' => 'باحث وثائقي يتتبع التاريخ وحضارات الشعوب',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 6
            [
                'text' => 'How do you usually handle ideological debates or disagreements?',
                'text_ar' => 'كيف تتعامل عادةً مع النقاشات أو الخلافات الفكرية؟',
                'options' => [
                    [
                        'text' => 'Analyzing the social background and psychology of the opponent',
                        'text_ar' => 'تحليل الخلفية الاجتماعية والنفسية للطرف الآخر وفهم دوافعه',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Using expressive language, storytelling, and artistic metaphors to clarify viewpoints',
                        'text_ar' => 'استخدام لغة بلاغية تعبيرية وتشبيهات فنية لتقريب وجهات النظر',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Relying on logic, constitutional laws, and documented historical events',
                        'text_ar' => 'الاعتماد على المنطق، النصوص القانونية، والوقائع التاريخية الموثقة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Finding a win-win compromise that serves everyone\'s practical interests',
                        'text_ar' => 'البحث عن تسوية عملية تحقق مصلحة مشتركة لجميع الأطراف المذكورة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                ],
            ],
            // Question 7
            [
                'text' => 'Which of these places do you find most inspiring to visit?',
                'text_ar' => 'أي من الأماكن التالية تجد زيارتها الأكثر متعة وإلهاماً لك؟',
                'options' => [
                    [
                        'text' => 'Archaeological sites, ruins, and historical landmarks',
                        'text_ar' => 'المواقع الأثرية، المتاحف، والمعالم التاريخية القديمة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Contemporary art galleries and cultural music theaters',
                        'text_ar' => 'معارض الفنون التشكيلية والمعاهد الثقافية والمسارح الموسيقية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Courts of law, parliaments, or international embassies',
                        'text_ar' => 'قاعات المحاكم، مجالس النواب، أو مقرات السفارات والهيئات الدولية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Stock markets, financial districts, and corporate headquarters',
                        'text_ar' => 'أسواق البورصة، ومقرات الشركات الاستثمارية الكبرى',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                ],
            ],
            // Question 8
            [
                'text' => 'What is your preferred way of exploring human global cultures?',
                'text_ar' => 'ما هي الطريقة المفضلة لديك لفهم ودراسة الثقافات المختلفة؟',
                'options' => [
                    [
                        'text' => 'Studying sociology, religious philosophies, and demographics',
                        'text_ar' => 'دراسة علم الاجتماع، الفلسفات الفكرية، والتركيبة السكانية للشعوب',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Exploring folklore, traditional music, and global cinematic arts',
                        'text_ar' => 'استكشاف الفولكلور الشعبي، الموسيقى التقليدية، والفنون السينمائية العالمية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Analyzing how global trade, commerce, and tourism connect people',
                        'text_ar' => 'تحليل كيف يربط التبادل التجاري، الأسواق، والحركات السياحية بين الدول',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Reading world literature, translated essays, and old manuscripts',
                        'text_ar' => 'قراءة الأدب العالمي، المقالات المترجمة، والمخطوطات القديمة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 9
            [
                'text' => 'If you volunteered for a non-profit organization, what would you do?',
                'text_ar' => 'إذا قررت التطوع في جمعية خيرية أو منظمة مجتمعية، ماذا تختار لتقدمه؟',
                'options' => [
                    [
                        'text' => 'Providing social counseling and mental health support',
                        'text_ar' => 'تقديم الإرشاد الاجتماعي والدعم النفسي للفئات المحتاجة',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Designing promotional posters and video campaigns for the cause',
                        'text_ar' => 'تصميم البوسترات الترويجية وصناعة الفيديوهات الإبداعية للحملة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Managing budgets, fundraising events, and financial resources',
                        'text_ar' => 'إدارة الميزانيات، جمع التبرعات، وتخطيط الموارد المالية للمنظمة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Drafting organizational policies, defenses, and legal advocacy papers',
                        'text_ar' => 'صياغة سياسات المنظمة، البيانات الحقوقية، وكتب الدفاع القانوني',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 10
            [
                'text' => 'Which television show or podcast topic appeals to you most?',
                'text_ar' => 'ما هي المواضيع المفضلة لديك عند متابعة البرامج الحوارية أو البودكاست؟',
                'options' => [
                    [
                        'text' => 'True crime investigations, courtroom stories, and justice system',
                        'text_ar' => 'التحقيقات في الجرائم الحقيقية، ثغرات القانون، وقضايا العدالة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Interviews with visual artists, musicians, filmmakers, and authors',
                        'text_ar' => 'حوارات عميقة مع الرسامين، الموسيقيين، صناع الأفلام والأدباء',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Biographies of great business founders, marketing secrets, and economics',
                        'text_ar' => 'قصص نجاح رواد الأعمال، أسرار الشركات، والاقتصاد الكلي والجزئي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Philosophical debates, historical events, and evolution of human thought',
                        'text_ar' => 'المناظرات الفلسفية، الأحداث التاريخية العظمى، وتطور الفكر البشري',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 11
            [
                'text' => 'When working on a group project, what is your communication strength?',
                'text_ar' => 'عند العمل ضمن فريق، ما هو الدور التواصلي الذي تتقنه؟',
                'options' => [
                    [
                        'text' => 'Writing and editing the official reports, executive summaries, and text documentation',
                        'text_ar' => 'صياغة التقارير الرسمية، التوثيق اللغوي، والملخصات المكتوبة بدقة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Directing the aesthetic identity, presentation colors, and creative concepts',
                        'text_ar' => 'تحديد الهوية الجمالية للمشروع، اختيار الألوان والتصاميم الإبداعية للعرض',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Pitching ideas confidently to stakeholders and persuading them of our value',
                        'text_ar' => 'تقديم العرض التقديمي بثقة، وإقناع الحضور أو لجنة التحكيم بجدوى الفكرة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Mediating interpersonal disputes and listening to everyone\'s internal concerns',
                        'text_ar' => 'حل النزاعات الشخصية بين الأعضاء، والاستماع لمخاوفهم لضمان بيئة مريحة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 12
            [
                'text' => 'What kind of environment gives you the most mental focus and calm?',
                'text_ar' => 'ما هي البيئة المحيطة التي تمنحك شعوراً بالراحة والتركيز العالي؟',
                'options' => [
                    [
                        'text' => 'A historic old city with rich heritage, ancient alleys, and architecture',
                        'text_ar' => 'المدن القديمة التي تفوح بالتراث، الأزقة العتيقة والهندسة المعمارية القديمة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                    [
                        'text' => 'A vibrant art studio filled with paints, musical instruments, or photography gear',
                        'text_ar' => 'استوديو فني حيوي مليء بالألوان، الآلات الموسيقية، أو أدوات التصوير',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 0],
                    ],
                    [
                        'text' => 'A high-energy, modern shared business space or corporate conference room',
                        'text_ar' => 'قاعات اجتماعات الشركات، أو مساحات العمل المشتركة ذات الطابع الاستثماري',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'A quiet library surrounded by shelves of thousands of old books and records',
                        'text_ar' => 'مكتبة كبرى هادئة جداً محاطة برفوف تحتوي آلاف الكتب والمجلدات الضخمة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 13
            [
                'text' => 'If you were to take a side course outside your main major, what would you choose?',
                'text_ar' => 'إذا رغبت في تعلم مهارة جانبية تدعم مسيرتك، ماذا ستختار؟',
                'options' => [
                    [
                        'text' => 'Simultaneous translation and international relations/diplomacy protocols',
                        'text_ar' => 'الترجمة الفورية ولغات الحوار الدبلوماسي والعلاقات الدولية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Graphic design, filmmaking basics, and digital photo editing software',
                        'text_ar' => 'التصميم الجرافيكي، مبادئ صناعة الأفلام، وبرامج المونتاج',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Digital marketing, social media ads management, and brand building',
                        'text_ar' => 'التسويق الرقمي، إدارة الإعلانات الممولة وبناء الهوية التجارية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 1, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Human resource management (HR), leadership and behavioral analysis strategies',
                        'text_ar' => 'إدارة الموارد البشرية (HR)، وإستراتيجيات القيادة وتحليل سلوك الموظفين',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 2],
                    ],
                ],
            ],
            // Question 14
            [
                'text' => 'What kind of societal issues do you care about solving the most?',
                'text_ar' => 'ما هي قضايا المجتمع التي تشعر برغبة قوية في المساهمة بحلها؟',
                'options' => [
                    [
                        'text' => 'Preserving historical heritage, archives, and cultural memory from disappearing',
                        'text_ar' => 'حماية التراث التاريخي، المخطوطات، والذاكرة الثقافية للمجتمع من الاندثار',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Defending freedom of speech, supporting local artists, and protecting intellectual properties',
                        'text_ar' => 'دعم المبدعين والمؤلفين وحماية الملكية الفكرية والحقوق الفنية والتبادل الإبداعي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 2],
                    ],
                    [
                        'text' => 'Fighting local unemployment, establishing economic security, and ethical investing',
                        'text_ar' => 'مكافحة البطالة، توفير فرص العمل، ودعم المشاريع الناشئة والاستثمار الأخلاقي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Protecting human rights, providing absolute legal aid, and ensuring justice for all',
                        'text_ar' => 'الدفاع عن حقوق الإنسان، تقديم العون القانوني، وترسيخ العدالة القضائية والمجتمعية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 15
            [
                'text' => 'Which of these professional career titles sounds most appealing to you?',
                'text_ar' => 'أي من مجالات العمل التالية ترى نفسك تبدع فيها مستقبلاً؟',
                'options' => [
                    [
                        'text' => 'Attorney, Legal Consultant, or Diplomat',
                        'text_ar' => 'محامٍ جنائي/حقوقي، مستشار قانوني، أو دبلوماسي في وزارة الخارجية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                    [
                        'text' => 'Journalist, Author, Scriptwriter, or Critic',
                        'text_ar' => 'صحفي استقصائي، روائي، كاتب مسرحي، أو ناقد أدبي وفني',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 2],
                    ],
                    [
                        'text' => 'HR Manager, Marketing Director, or Business Consultant',
                        'text_ar' => 'مدير موارد بشرية، مدير تسويق إستراتيجي، أو مستشار تطوير أعمال',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Sociologist, Historian, Archaeologist, or Professor of Philosophy',
                        'text_ar' => 'عالم اجتماع، مؤرخ، باحث آثار، أو أستاذ فلسفة في الجامعة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
        ];
        $literaryAssessment = Assessment::create([
            'title' => 'Student Opportunity Assessment (Literary)',
            'titleAr' => 'اختبار الفرص الطلابية - القسم الأدبي',
            'description' => 'Helps literary students choose their specialization',
            'track' => 'Literary',
        ]);
        foreach ($literaryQuestions as $q) {
            $question = Question::create([
                'assessment_id' => $literaryAssessment->id, // ربطه باختبار الأدبي
                'question_text' => $q['text'],
                'question_text_ar' => $q['text_ar'],
                'category' => 'general',
                'weight' => 1,
            ]);

            foreach ($q['options'] as $o) {
                $option = Option::create([
                    'question_id' => $question->id,
                    'option_text' => $o['text'],
                    'option_text_ar' => $o['text_ar'],
                    'score_value' => array_sum($o['weights']),
                    'tag' => 'stream',
                ]);

                foreach ($o['weights'] as $stream => $weight) {
                    OptionStreamWeight::create([
                        'option_id' => $option->id,
                        'stream' => $stream,
                        'weight' => $weight,
                    ]);
                }
            }
        }
        // Users
        User::create([
            'name' => 'Ahmad',
            'email' => 'ahmad@test.com',
            'phone' => '0999999991',
            'password' => Hash::make('password'),
            'type' => 'student',
            'track' => 'Scientific',
        ]);

        // Assessment
        $assessment = Assessment::create([
            'title' => 'Student Opportunity Assessment',
            'titleAr' => 'اختبار الفرص الطلابية',
            'description' => 'Helps students choose their university specialization',
            'track' => 'Scientific',
        ]);

        // Questions & Options with stream weights
        $questions = [
            // Question 1
            [
                'text' => 'Which activity excites you the most?',
                'text_ar' => 'أي نشاط يثير حماسك أكثر؟',
                'options' => [
                    [
                        'text' => 'Solving a tricky math or logic puzzle',
                        'text_ar' => 'حل لغز رياضي معقد',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Helping someone recover from illness',
                        'text_ar' => 'مساعدة شخص على الشفاء',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Designing a poster or short film',
                        'text_ar' => 'تصميم بوستر أو فيلم قصير',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Debating ideas, history or languages',
                        'text_ar' => 'النقاش في الأفكار واللغات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 2
            [
                'text' => 'What kind of problems do you enjoy solving?',
                'text_ar' => 'ما نوع المشكلات التي تستمتع بحلها؟',
                'options' => [
                    [
                        'text' => 'Technical and engineering problems',
                        'text_ar' => 'مشكلات تقنية وهندسية',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Health and human body problems',
                        'text_ar' => 'مشكلات صحية وجسد الإنسان',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Business and financial problems',
                        'text_ar' => 'مشكلات تجارية ومالية',
                        'weights' => ['engineering' => 1, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Social and humanitarian problems',
                        'text_ar' => 'مشكلات اجتماعية وإنسانية',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 3
            [
                'text' => 'How do you prefer to express yourself?',
                'text_ar' => 'كيف تفضل التعبير عن نفسك؟',
                'options' => [
                    [
                        'text' => 'Through building or programming',
                        'text_ar' => 'من خلال البناء أو البرمجة',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Through caring and helping others',
                        'text_ar' => 'من خلال الرعاية ومساعدة الآخرين',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Through art and visual design',
                        'text_ar' => 'من خلال الفن والتصميم البصري',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Through writing and storytelling',
                        'text_ar' => 'من خلال الكتابة ورواية القصص',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 4
            [
                'text' => 'What subject did you enjoy most at school?',
                'text_ar' => 'ما المادة التي استمتعت بها أكثر في المدرسة؟',
                'options' => [
                    [
                        'text' => 'Mathematics and Physics',
                        'text_ar' => 'الرياضيات والفيزياء',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Biology and Chemistry',
                        'text_ar' => 'الأحياء والكيمياء',
                        'weights' => ['engineering' => 1, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Arts and Music',
                        'text_ar' => 'الفنون والموسيقى',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'History and Languages',
                        'text_ar' => 'التاريخ واللغات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 5
            [
                'text' => 'Where do you see yourself working in the future?',
                'text_ar' => 'أين ترى نفسك تعمل في المستقبل؟',
                'options' => [
                    [
                        'text' => 'In a tech company or engineering firm',
                        'text_ar' => 'في شركة تقنية أو هندسية',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'In a hospital or medical center',
                        'text_ar' => 'في مستشفى أو مركز طبي',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'In a creative studio or media agency',
                        'text_ar' => 'في استوديو إبداعي أو وكالة إعلام',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'In a law firm or international organization',
                        'text_ar' => 'في مكتب محاماة أو منظمة دولية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 6
            [
                'text' => 'What motivates you the most?',
                'text_ar' => 'ما الذي يحفزك أكثر؟',
                'options' => [
                    [
                        'text' => 'Building something new and innovative',
                        'text_ar' => 'بناء شيء جديد ومبتكر',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 1, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Saving lives and improving health',
                        'text_ar' => 'إنقاذ الأرواح وتحسين الصحة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Creating art that touches people',
                        'text_ar' => 'إبداع فن يلامس الناس',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Fighting for justice and rights',
                        'text_ar' => 'النضال من أجل العدالة والحقوق',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 7
            [
                'text' => 'What type of books or articles do you prefer reading?',
                'text_ar' => 'ما نوع الكتب أو المقالات التي تفضل قراءتها؟',
                'options' => [
                    [
                        'text' => 'Technology and scientific discoveries',
                        'text_ar' => 'التكنولوجيا والاكتشافات العلمية',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Anatomy, biology, and health wellness',
                        'text_ar' => 'التشريح، علم الأحياء، والصحة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Entrepreneurship, marketing, and leadership',
                        'text_ar' => 'ريادة الأعمال، التسويق، والقيادة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'History, philosophy, or classic literature',
                        'text_ar' => 'التاريخ، الفلسفة، أو الأدب الكلاسيكي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 8
            [
                'text' => 'If you were given a large budget, what would you do?',
                'text_ar' => 'إذا حصلت على ميزانية كبيرة، ماذا ستفعل بها؟',
                'options' => [
                    [
                        'text' => 'Invent a new smart device or software',
                        'text_ar' => 'ابتكار جهاز ذكي أو برنامج جديد',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Fund a medical research facility',
                        'text_ar' => 'تمويل منشأة للأبحاث الطبية',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Start a new business or investment firm',
                        'text_ar' => 'تأسيس شركة جديدة أو مؤسسة استثمارية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Open a cultural center or art gallery',
                        'text_ar' => 'افتتاح مركز ثقافي أو معرض فني',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 2],
                    ],
                ],
            ],
            // Question 9
            [
                'text' => 'In a group project, what is usually your role?',
                'text_ar' => 'في المشاريع الجماعية، ما هو دورك المعتاد؟',
                'options' => [
                    [
                        'text' => 'The technical expert or data analyst',
                        'text_ar' => 'الخبير التقني أو محلل البيانات',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'The caregiver ensuring everyone is okay',
                        'text_ar' => 'المراعي الذي يتأكد من راحة وسلامة الجميع',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'The leader organizing and strategizing',
                        'text_ar' => 'القائد الذي ينظم ويضع الاستراتيجيات',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'The creative mind pitching visual ideas',
                        'text_ar' => 'العقل المبدع الذي يطرح الأفكار والتصاميم',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 0],
                    ],
                ],
            ],
            // Question 10
            [
                'text' => 'Which tool do you feel most comfortable using?',
                'text_ar' => 'أي أداة تشعر براحة أكبر في استخدامها؟',
                'options' => [
                    [
                        'text' => 'Calculators and CAD software',
                        'text_ar' => 'الآلات الحاسبة وبرامج التصميم الهندسي',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 1, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Microscopes and lab equipment',
                        'text_ar' => 'المجاهر والمعدات المخبرية',
                        'weights' => ['engineering' => 1, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Spreadsheets and financial models',
                        'text_ar' => 'جداول البيانات والنماذج المالية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Paintbrushes, instruments, or drafting tools',
                        'text_ar' => 'فراشي الألوان، الآلات الموسيقية، أو أدوات الكتابة',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 3, 'humanities' => 2],
                    ],
                ],
            ],
            // Question 11
            [
                'text' => 'What kind of work environment do you prefer?',
                'text_ar' => 'ما نوع بيئة العمل التي تفضلها؟',
                'options' => [
                    [
                        'text' => 'A high-tech lab or construction site',
                        'text_ar' => 'مختبر عالي التقنية أو موقع بناء',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'A dynamic clinic or hospital setting',
                        'text_ar' => 'عيادة أو مستشفى مليء بالحركة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'A fast-paced corporate office',
                        'text_ar' => 'مكتب شركة سريع الإيقاع',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'A quiet library, studio, or museum',
                        'text_ar' => 'مكتبة هادئة، استوديو، أو متحف',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 12
            [
                'text' => 'How do you handle complex information?',
                'text_ar' => 'كيف تتعامل مع المعلومات المعقدة؟',
                'options' => [
                    [
                        'text' => 'Breaking it down into systems and formulas',
                        'text_ar' => 'تقسيمها إلى أنظمة ومعادلات',
                        'weights' => ['engineering' => 3, 'medical' => 1, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Relating it to biological and organic processes',
                        'text_ar' => 'ربطها بالعمليات العضوية والبيولوجية',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Analyzing it for market trends and profits',
                        'text_ar' => 'تحليلها لمعرفة اتجاهات السوق والأرباح',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Exploring its cultural and philosophical context',
                        'text_ar' => 'استكشاف سياقها الثقافي والفلسفي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 13
            [
                'text' => 'Which documentary would you most likely watch?',
                'text_ar' => 'أي فيلم وثائقي من المرجح أن تشاهده؟',
                'options' => [
                    [
                        'text' => 'How mega-structures and machines are built',
                        'text_ar' => 'كيف تُبنى الهياكل والآلات العملاقة',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'The mysteries of the human brain and genetics',
                        'text_ar' => 'أسرار العقل البشري والجينات',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'The rise and fall of giant corporations',
                        'text_ar' => 'صعود وسقوط الشركات الكبرى',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'The history of ancient civilizations and art',
                        'text_ar' => 'تاريخ الحضارات القديمة والفنون',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 0, 'arts' => 2, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 14
            [
                'text' => 'If you had to solve a mystery, what would be your approach?',
                'text_ar' => 'إذا كان عليك حل لغز غامض، فما هو أسلوبك؟',
                'options' => [
                    [
                        'text' => 'Using strict logic and mathematical deductions',
                        'text_ar' => 'استخدام المنطق الصارم والاستنتاجات الرياضية',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Analyzing physical and forensic evidence',
                        'text_ar' => 'تحليل الأدلة المادية والجنائية',
                        'weights' => ['engineering' => 1, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Following the money trail and motives',
                        'text_ar' => 'تتبع مسار الأموال والدوافع المالية',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Interviewing people and understanding psychology',
                        'text_ar' => 'إجراء مقابلات مع الناس وفهم سيكولوجيتهم',
                        'weights' => ['engineering' => 0, 'medical' => 1, 'business' => 0, 'arts' => 1, 'humanities' => 3],
                    ],
                ],
            ],
            // Question 15
            [
                'text' => 'What do you consider your strongest skill?',
                'text_ar' => 'ما هي المهارة التي تعتبرها نقطة قوتك؟',
                'options' => [
                    [
                        'text' => 'Spatial reasoning and mechanics',
                        'text_ar' => 'التفكير المكاني والميكانيكا',
                        'weights' => ['engineering' => 3, 'medical' => 0, 'business' => 0, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Empathy and memorizing vast scientific data',
                        'text_ar' => 'التعاطف وحفظ البيانات العلمية الواسعة',
                        'weights' => ['engineering' => 0, 'medical' => 3, 'business' => 0, 'arts' => 0, 'humanities' => 1],
                    ],
                    [
                        'text' => 'Negotiation and risk management',
                        'text_ar' => 'التفاوض وإدارة المخاطر',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 3, 'arts' => 0, 'humanities' => 0],
                    ],
                    [
                        'text' => 'Communication and creative expression',
                        'text_ar' => 'التواصل والتعبير الإبداعي',
                        'weights' => ['engineering' => 0, 'medical' => 0, 'business' => 1, 'arts' => 3, 'humanities' => 3],
                    ],
                ],
            ],
        ];

        foreach ($questions as $index => $q) {
            $question = Question::create([
                'assessment_id' => $assessment->id,
                'question_text' => $q['text'],
                'question_text_ar' => $q['text_ar'],
                'category' => 'general',
                'weight' => 1,
            ]);

            foreach ($q['options'] as $o) {
                $option = Option::create([
                    'question_id' => $question->id,
                    'option_text' => $o['text'],
                    'option_text_ar' => $o['text_ar'],
                    'score_value' => array_sum($o['weights']),
                    'tag' => 'stream',
                ]);

                foreach ($o['weights'] as $stream => $weight) {
                    OptionStreamWeight::create([
                        'option_id' => $option->id,
                        'stream' => $stream,
                        'weight' => $weight,
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
