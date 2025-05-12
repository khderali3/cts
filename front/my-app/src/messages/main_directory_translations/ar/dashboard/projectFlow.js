

export default  {

    projectType : {
        projectTypeSection : {
            section_title : "قسم أنواع المشاريع",

            form : {
                title : 'العنوان',
                details : 'التفاصيل',
                title_ar : 'العنوان (عربي)',
                details_ar : "التفاصيل (عربي)",
                edit : 'تعديل',
                modal_msg : "هل فعلاً تريد حفظ التعديلات؟",
                cancel :'إلغاء الأمر',
                edit : 'تعديل',
                update: 'حفظ التغيرات',
                updating: 'جاري التعديل',
            }

        },

            list_table : {
                title : 'قائمة أنواع المشاريع',

                project_name : 'إسم المشروع' ,
                project_name_ar : 'إسم المشروع (عربي)',
                actions : 'الإجراءات',
                edit : 'تعديل',
                delete : 'حذف'
        },
        form_add_or_edit : {
            project_name : 'إسم المشروع',
            project_name_hint : 'إسم المشروع - تلميح',
            details : 'تفاصيل',
            project_name_ar : 'اسم المشروع (عربي)',
            project_name_hint_ar : 'إسم المشروع - تلميح (عربي)',
            details_ar : 'تفاصيل (عربي)',
            Published :'إعلان على الموقع',
            auto_clone_template : 'تركيب تلقائي لقالب الخطوات',
            search_template_lable: 'يرجى اختيار القالب',
            search_template_ph : 'يرجى إختيار القالب',
            main_image :'الصورة الرئيسية',
            current_image : 'الصورة الحالية',

            extra_images : 'صور إضافية',
            Attachments : 'إرفاق ملفات',
            cancel : 'إلغاء الأمر',
            update : 'حفظ التغييرات',
            add : 'إضافة',
            edit_project_type : 'تعديل نوع المشروع'

        } 

    },
        projectflow_template : {
        main_page : {
            page_title : 'قوالب خطوات المشاريع',
            add_new_template : "إنشاء قالب جديد",
            template_name : 'إسم القالب',
            search_ph : 'البحث بإسم القالب',
            results : "نتائج البحث عن",
            id : 'الرقم',
            show_steps_to_client : 'عرض الخطوات للعميل',
            steps_process_strategy : 'إستراتيجية معالجة الخطوات',
            manual_start_mode : 'نمط التشغيل اليدوي',
        },

        add_or_edit_template_form : {
            add_title : ' إضافة قالب جديد ',
            edit_title : ' تعديل إعدادات القالب',



            template_name : 'إسم القالب',
            template_name_des : "أدخل إسم للقالب",

            steps_process_strategy : 'إستراتيجية معالجة الخطوات',
            steps_process_strategy_des : "'تلقائي' : الخطوة التالية سوف تبدأ تلقائياً بمجرد إنتهاء الخطوة السابقة , 'يدوي': الطاقم او العميل يجب أن يشغل كل خطوة يدوياً",

            manual_start_mode : 'نمط التشغيل اليدوي',
            manual_start_mode_des : 'تسلسلي : يمكن تشغيل الخطوة فقط في حالة إنتهاء الخطوة السابقة , غير تسلسلي : يمكن تشغيل الخطوة حتى لو الخطوة السابقة غير منتهية',

            auto_start_first_step : "تشغيل الخطوة الأولى بشكل تلقائي ",
            auto_start_first_step_des : "في حال كان مفعل سيتم تشغيل الخطوة الأولى تلقائياً بمجر تركيب القالب على مشروع العميل",

            show_steps_to_client : 'عرض الخطوات للعميل',
            show_steps_to_client_des : "إختر إمكانية عرض الخطوات للعميل.",

            show_steps_status_logs_to_client : 'عرض سجلات حالات الخطوات للعميل',
            show_steps_status_logs_to_client_des : "اخر إمكانية عرض سجلات حالات الخطوات للعميل",




            submit : 'إرسال',
            edit_save_btn : 'حفظ التغييرات'

        }




    },

    template_details : {
        mini_nav : {
            Project_Flow_Template : ' قوالب الخطوات',
            Template_Details : 'تفاصيل القالب'
        },
        detail : 'تفاصيل ',
        Template_ID : 'الرقم',
        Template_Name : 'إسم القالب ',
        Steps_Process_Strategy : 'إستراتيجية معالجة الخطوات',
        Manual_Start_Mode : 'نمط التشغيل اليدوي',
        Auto_Start_First_Step :  "تشغيل الخطوة الأولى بشكل تلقائي ",
        Show_Steps_To_Client : 'عرض الخطوات للعميل',
        Show_Step_Status_Logs_To_Client  : 'عرض سجلات حالات الخطوات للعميل',
  

        Add_New_Step : 'إضافة خطوة جديدة',
        Edit : 'تعديل',
        Delete : 'حذف',

    }

}