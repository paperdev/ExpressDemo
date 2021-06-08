export default async function(req, res, next) {
    try {
        const result = {
            title : 'login'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}