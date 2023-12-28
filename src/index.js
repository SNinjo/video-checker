import path from 'path';
import ffmpeg from 'fluent-ffmpeg';


export async function getMetadata(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(path.resolve(filePath), (error, metadata) => {
            if (error) reject(error);
            else resolve(metadata);
        })
    })
}


export async function isVideoLengthMoreThan(second, filePath) {
    return (await getMetadata(filePath)).format.duration > second;
}


export async function getAudioStream(filePath) {
    let metadata = await getMetadata(filePath);

    return (
        metadata
            .streams
            .filter(({ codec_type }) => (codec_type === 'audio'))
    )
}
export async function isVideoWithAudioTrack(filePath) {
    return (await getAudioStream(filePath)).length !== 0;
}
export async function getAudioLength(filePath) {
    let audioStream = await getAudioStream(filePath);
    return (audioStream.length !== 0)? audioStream[0].duration : -1;
}

export async function getSilenceDuration(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg(path.resolve(filePath))
            .audioFilters('silencedetect=noise=0.0001')
            .outputOptions([
                '-max_muxing_queue_size 1024',
            ])
            .on('error', (error) => {
                reject(error)
            })
            .on('end', (error, stdout) => {
                let silenceDuration = stdout.match(/silence_duration: ([\d.]+)/);
                resolve(silenceDuration? +silenceDuration[1] : -1);
            })
            // Null muxer
            .format(null)
            .save('./fakeFile')
    })
}
export async function isSilent(filePath) {
    let audioLength = await getAudioLength(filePath);
    let silenceDuration = await getSilenceDuration(filePath);

    return (audioLength - silenceDuration) < 1;
}