export default async function(req, res, next) {
    try {
        const result = {
            title : 'file2'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}