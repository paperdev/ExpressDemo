export default async function(req, res, next) {
    try {
        const result = {
            title : 'file1'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}