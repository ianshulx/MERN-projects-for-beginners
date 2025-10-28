export const getEvn = (envname) => {
    const env =  import.meta.env
    return env[envname]
}