export const notFoundMiddleware = (req, res, next) => {
    res.status(404).send('Opps! Route was not found');
};
