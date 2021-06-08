export default async function(err, req, res, next){
    const statusCode = err.status || 500;

    if (500 === statusCode) {
        console.error(err.stack || err);
    }
    res.status(statusCode);

    return next(err);
}