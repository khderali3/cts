



export const get_string_allow_process_by = (value) => {

    if(value === 'specific_staff_group') return "Specific Staff Group"
    else if(value === "any_staff") return "Any Staff"
    else if(value === "client") return 'Client'
    return ''
}


export const get_string_show_status_log_to_client = (value) => {

    if(value === 'inherit_from_project_flow') return "Inherit From Template"
    else if(value === "yes") return "Yes"
    else if(value === "no") return 'No'
    return ''
}



export const get_string_start_process_strategy = (value) => {

    if(value === 'inherit_from_project_flow') return "Inherit From Template"
    else if(value === "yes") return "Yes"
    else if(value === "no") return 'No'
    return ''
}
