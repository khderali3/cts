

export default  {

    projectType : {
        projectTypeSection : {
            section_title : "Project Type Section",
            form : { 
                title : 'Title',
                details : 'Details',
                title_ar : 'Title (Ar)',
                details_ar : "Details (Ar)",
                edit : 'Edit',
                modal_msg : "are you sure you wana update project type secion data?",
                cancel :'cancel',
                edit : 'Edit',
                update: 'Update',
                updating: 'Updating..',

            }

        },
            list_table : {
                title : 'List item Project Type',
                project_name : 'Project Name' ,
                project_name_ar : 'Project Name (Ar)',
                actions : 'Actions',
                edit : 'Edit',
                delete : 'Delete'
        },

        form_add_or_edit : {
            project_name : 'Project Name',
            project_name_hint : 'Project Name Hint',
            details : 'Details',
            project_name_ar : 'Project Name (Ar)',
            project_name_hint_ar : 'Project Name Hint (Ar)',
            details_ar : 'Details (Ar)',
            Published :'Published',
            auto_clone_template : 'Auto Clone Template',
            search_template_lable: 'Select projectFlow Template',
            search_template_ph : 'Please Select projectFlow Template',
            main_image :'Main Image',
            current_image : 'Current Image',
            extra_images : 'Extra Images',
            Attachments : 'Attachments',
            cancel : 'Cancel',
            update : 'Update',
            add : 'Add Item',
            edit_project_type : 'Edit Project Type'
           
        }
    },

    projectflow_template : {
        main_page : {
            page_title : 'ProjectFlow Templates',
            add_new_template : "Add New Template",
            template_name : 'Template Name',
            search_ph : 'Search By Template Name',
            results : "Results Search for template name",
            id : 'ID',
            show_steps_to_client : 'Show Steps To Client',
            steps_process_strategy : 'steps Process Strategy',
            manual_start_mode : 'Manual Start Mode',
        },
        add_or_edit_template_form : {
            add_title : ' Add New ProjectFlow Template ',
            edit_title : ' Edit ProjectFlow Template ',


            template_name : 'Template Name',
            template_name_des : "Enter a name for this template.",

            steps_process_strategy : 'steps Process Strategy',
            steps_process_strategy_des : "Auto: The next step starts automatically when the previous step is complete. Manual: Staff must manually start each step.",


            manual_start_mode : 'Manual Start Mode',
            manual_start_mode_des : 'Serialized: A step can only start if the previous one is completed. Non-Serialized: Steps can start in any order.',



            auto_start_first_step : "Auto Start First Step ",
            auto_start_first_step_des : "If enabled, the first step will automatically change to 'In Progress' when the template is cloned (steps and settings are copied) to the project flow.",
           
            show_steps_to_client : 'Show Steps To Client',
            show_steps_to_client_des : "Choose whether clients can see project steps.",

            show_steps_status_logs_to_client : 'Show Steps Status Logs To Client',
            show_steps_status_logs_to_client_des : "Choose whether clients can see step status logs.",

            submit : 'Submit',
            edit_save_btn : 'Save Changes'

        }
    },
    template_details : {
        mini_nav : {
            Project_Flow_Template : ' ProjectFlow Template',
            Template_Details : 'Template Details'
        },
        detail : ' Details',
        Template_ID : 'Template ID',
        Template_Name : 'Template Name ',
        Steps_Process_Strategy : ' Steps Process Strategy',
        Manual_Start_Mode : 'Manual Start Mode',
        Auto_Start_First_Step : ' Auto Start First Step' ,
        Show_Steps_To_Client :'Show Steps To Client',
        Show_Step_Status_Logs_To_Client : 'Show Step Status Logs To Client',
        Add_New_Step : 'Add New Step',
        Edit : 'Edit',
        Delete : 'Delete',
    }


}