let prot = window.location.protocol;
let config = {
    env: process.env.VUE_APP_ENV,
    base_url_api:prot+process.env.VUE_APP_BASE_URL_API,
    base_url_fe:prot+process.env.VUE_APP_BASE_URL_FE
}
if(process.env.VUE_APP_ENV=="dev"){
    config.base_url_api='';
    config.base_url_fe='';
}
export default config;
