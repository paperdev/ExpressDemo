export default async function(req, res, next){
    console.log(
        'TYPE : %s URL : %s  params : %s',
        req.method,
        req.originalUrl,
        JSON.stringify(req.params)
    );

    return next();
}