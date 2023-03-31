export interface DocumentsData {
    docs: Doc[]
    signin_by_token: SigninByToken
}

export interface Doc {
    id: string
    deal_doc_id: string
    holding_id: number
    division_id: number
    excluded_from_restricted_list: boolean
    created: string
    is_declassified: boolean
    last_revision_id: string
    size: string
    irm_type_id: number
    irm_override: boolean
    deal_id: number
    dataroom_id?: string
    doc_name: string
    name: string
    original_filename: string
    original_path: string
    modified: string
    is_private: boolean
    posted: string
    source_file_id?: string
    system_folder_id: number
    system_folder_path: number[]
    system_folder_name: string
    system_folder_path_strings: string[]
    root_system_folder_id: number
    status_id: number
    status_name: string
    blob_size: string
    blob_mime: string
    blob_id: string
    blob_hash: string
    last_accessed?: string
    display_name: string
    display_extension: string
    folder_path: string
    read: boolean
    in_dataroom?: boolean
    holding: Holding
    source_file?: SourceFile
    email_note?: string
    folder_path_elements: FolderPathElement[]
}

export interface Holding {
    id: number
    division_id: number
    deal_id: number
    industry_id?: number
    status_id: number
    created: string
    modified: string
    amount: any
    owner_analyst_user_ids?: number[]
    last_posted_public?: string
    last_posted_private?: string
    cusips?: string[]
    figis?: string[]
    lxids?: string[]
    doc_count_public: number
    doc_count: number
    status_name: string
    deal_status_id: number
    deal_status_name: string
    deal_issuer_id: number
    deal_agent_id: number
    deal_source_id: number
    deal_cusips?: string[]
    deal_figis?: string[]
    deal_lxids?: string[]
    deal_created: string
    deal_modified: string
    deal_type_id: number
    deal_type_name: string
    deal_name: string
    deal_original_name?: string
    deal_total?: number
    deal_dataroom_id?: string
    parent_holding_id?: number
    owner_analyst_user_names?: string[]
    agent_name: string
    issuer_name: string
    last_posted?: string
    deal_source_name: string
    deal_issuer_name: string
    deal_agent_name: string
    client_issuer_name?: string
    source_name: string
    division_name: string
    industry_name?: string
    has_private_access: boolean
    last_accessed?: string
    in_dataroom: boolean
    last_seen_in_dataroom?: string
    last_scraped: any
    client_id: number
}

export interface SourceFile {
    id: string
    note?: string
}

export interface FolderPathElement {
    level: number
    id: number
    name: string
}

export interface SigninByToken {
    token: Token
    user: User
    login_user: LoginUser
    login_client: LoginClient
    client: Client
    has_security_questions: boolean
    require_two_factor: boolean
    must_set_two_factor: boolean
    must_validate_two_factor: boolean
}

export interface Token {
    token: string
    data: Data2
}

export interface Data2 {
    expires: string
    expires_in: string
    user_id: number
    client_id: number
    login_user_id: number
    login_client_id: number
    login_client_is_support: boolean
    forgerytoken: string
}

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    auth_provider: any
    is_support_account: boolean
    private_access_mode_id: number
    force_password_reset: boolean
    has_two_factor_auth: boolean
    client_auth_provider: number
    calculated_auth_provider: number
    divisions: Division[]
    role: Role
}

export interface Division {
    id: number
    division_name: string
}

export interface Role {
    id: number
    role_name: string
    permissions: Permission[]
}

export interface Permission {
    id: number
    code: string
    permission_name: string
}

export interface LoginUser {
    id: number
    status_name: string
    first_name: string
    last_name: string
    is_support_account: boolean
    password_exp_date: string
    force_password_reset: boolean
    auth_provider: number
}

export interface LoginClient {
    id: number
    client_name: string
    status_name: string
    is_support_account: boolean
    require_two_factor_auth: boolean
}

export interface Client {
    id: number
    client_name: string
    default_deal_identifier: string
    password_expiration_in_days: number
    user_idle_timeout_in_minutes: number
    private_access_request_mode_id: number
    require_two_factor_auth: boolean
    fields_config: string
    feature_ids: number[]
    client_documents_view_name: string
    issuer_recon_custom_field_name: any
    options: number
}
