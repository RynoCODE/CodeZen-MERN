import client from '../lib/redisClient';

export const addSubmissionToQueue = async (data: { problemId: string, userId: string, code: string, language: string ,uuid: string}) => {
    const { problemId, userId, code, language, uuid } = data;
    let workerPicktime = new Date(Date.now());
    let workerTryCount = 0;
    let time = new Date().toISOString();
    if (!problemId || !userId || !code || !language || !uuid) {
        throw new Error('All fields are required and must be valid.');
    }
    try {
        await client.lpush('submissions', JSON.stringify({
            problemId,
            userId,
            code,
            language,
            workerPicktime,
            workerTryCount,
            time,
            uuid
        }));
        console.log('Submission added to queue successfully');
    } catch (error) {
        console.error('Error adding submission to queue:', error);
        throw error;
    }
};
