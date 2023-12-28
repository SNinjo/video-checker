import { getMetadata, isVideoLengthMoreThan, isVideoWithAudioTrack, getAudioLength, getSilenceDuration, isSilent } from './index.js';




// const metadataNormalLessThan1Min = {
//     streams: [
//         {
//             index: 0,
//             codec_name: 'h264',
//             codec_long_name: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
//             profile: 'High',
//             codec_type: 'video',
//             codec_time_base: '1/60',
//             codec_tag_string: 'avc1',
//             codec_tag: '0x31637661',
//             width: 848,
//             height: 464,
//             coded_width: 848,
//             coded_height: 464,
//             has_b_frames: 1,
//             sample_aspect_ratio: '1:1',
//             display_aspect_ratio: '53:29',
//             pix_fmt: 'yuv420p',
//             level: 31,
//             color_range: 'tv',
//             color_space: 'bt709',
//             color_transfer: 'bt709',
//             color_primaries: 'bt709',
//             chroma_location: 'left',
//             field_order: 'unknown',
//             timecode: 'N/A',
//             refs: 1,
//             is_avc: 'true',
//             nal_length_size: 4,
//             id: 'N/A',
//             r_frame_rate: '30/1',
//             avg_frame_rate: '30/1',
//             time_base: '1/600',
//             start_pts: 0,
//             start_time: 0,
//             duration_ts: 27640,
//             duration: 46.066667,
//             bit_rate: 1606978,
//             max_bit_rate: 'N/A',
//             bits_per_raw_sample: 8,
//             nb_frames: 1382,
//             nb_read_frames: 'N/A',
//             nb_read_packets: 'N/A',
//             tags: {
//                 creation_time: '2023-05-04T16:39:08.000000Z',
//                 language: 'und',
//                 handler_name: 'Core Media Video'
//             },
//             disposition: {
//                 default: 1,
//                 dub: 0,
//                 original: 0,
//                 comment: 0,
//                 lyrics: 0,
//                 karaoke: 0,
//                 forced: 0,
//                 hearing_impaired: 0,
//                 visual_impaired: 0,
//                 clean_effects: 0,
//                 attached_pic: 0,
//                 timed_thumbnails: 0
//             }
//         },
//         {
//             index: 1,
//             codec_name: 'aac',
//             codec_long_name: 'AAC (Advanced Audio Coding)',
//             profile: 'LC',
//             codec_type: 'audio',
//             codec_time_base: '1/44100',
//             codec_tag_string: 'mp4a',
//             codec_tag: '0x6134706d',
//             sample_fmt: 'fltp',
//             sample_rate: 44100,
//             channels: 2,
//             channel_layout: 'stereo',
//             bits_per_sample: 0,
//             id: 'N/A',
//             r_frame_rate: '0/0',
//             avg_frame_rate: '0/0',
//             time_base: '1/44100',
//             start_pts: 0,
//             start_time: 0,
//             duration_ts: 2028102,
//             duration: 45.988707,
//             bit_rate: 60579,
//             max_bit_rate: 64000,
//             bits_per_raw_sample: 'N/A',
//             nb_frames: 1983,
//             nb_read_frames: 'N/A',
//             nb_read_packets: 'N/A',
//             tags: {
//                 creation_time: '2023-05-04T16:39:08.000000Z',
//                 language: 'und',
//                 handler_name: 'Core Media Audio'
//             },
//             disposition: {
//                 default: 1,
//                 dub: 0,
//                 original: 0,
//                 comment: 0,
//                 lyrics: 0,
//                 karaoke: 0,
//                 forced: 0,
//                 hearing_impaired: 0,
//                 visual_impaired: 0,
//                 clean_effects: 0,
//                 attached_pic: 0,
//                 timed_thumbnails: 0
//             }
//         }
//     ],
//     format: {
//         filename: '/home/biggo/桌面/gitea/video-checker/videos/normalLessThan1Min.mp4',
//         nb_streams: 2,
//         nb_programs: 0,
//         format_name: 'mov,mp4,m4a,3gp,3g2,mj2',
//         format_long_name: 'QuickTime / MOV',
//         start_time: 0,
//         duration: 46.066667,
//         size: 9631285,
//         bit_rate: 1672582,
//         probe_score: 100,
//         tags: {
//             major_brand: 'mp42',
//             minor_version: '1',
//             compatible_brands: 'isommp41mp42',
//             creation_time: '2023-05-04T16:39:08.000000Z'
//         }
//     },
//     chapters: []
// }




// describe('Test function getMetadata', () => {
//     // Haven't tested the details yet
//     it('has sound', async () => {
//         await expect(getMetadata('./videos/normalLessThan1Min.mp4')).resolves.toEqual(metadataNormalLessThan1Min);
//     })
//     it('throw error (file not found)', async () => {
//         await expect(getMetadata('./videos/notFound.mp4')).rejects.toThrow();
//     })
// })


describe('Test function isVideoLengthMoreThan', () => {
    it('<1min', async () => {
        await expect(isVideoLengthMoreThan((60 * 1), './videos/normalLessThan1Min.mp4')).resolves.toBe(false);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/normalLessThan1Min.mp4')).resolves.toBe(false);

        await expect(isVideoLengthMoreThan((60 * 1), './videos/noSoundWithoutAudioTrack.mp4')).resolves.toBe(false);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/noSoundWithoutAudioTrack.mp4')).resolves.toBe(false);

        await expect(isVideoLengthMoreThan((60 * 1), './videos/noSoundWithAudioTrack.mp4')).resolves.toBe(false);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/noSoundWithAudioTrack.mp4')).resolves.toBe(false);


        await expect(isVideoLengthMoreThan((60 * 1), './videos/noSoundWithAudioTrack2.mp4')).resolves.toBe(false);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/noSoundWithAudioTrack2.mp4')).resolves.toBe(false);
    })
    it('1min-5min', async () => {
        await expect(isVideoLengthMoreThan((60 * 1), './videos/normalLessThan2Min.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/normalLessThan2Min.mp4')).resolves.toBe(false);

        await expect(isVideoLengthMoreThan((60 * 1), './videos/audioTooSoft.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/audioTooSoft.mp4')).resolves.toBe(false);
    })
    it('>5min', async () => {
        await expect(isVideoLengthMoreThan((60 * 1), './videos/normalLessThan10Min.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/normalLessThan10Min.mp4')).resolves.toBe(true);

        await expect(isVideoLengthMoreThan((60 * 1), './videos/normalLessThan15Min.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 5), './videos/normalLessThan15Min.mp4')).resolves.toBe(true);
    })
    it('precise', async () => {
        await expect(isVideoLengthMoreThan((60 * 0 + 45), './videos/normalLessThan1Min.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 0 + 47), './videos/normalLessThan1Min.mp4')).resolves.toBe(false);

        await expect(isVideoLengthMoreThan((60 * 1 + 41), './videos/normalLessThan2Min.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 1 + 43), './videos/normalLessThan2Min.mp4')).resolves.toBe(false);

        await expect(isVideoLengthMoreThan((60 * 9 + 48), './videos/normalLessThan10Min.mp4')).resolves.toBe(true);
        await expect(isVideoLengthMoreThan((60 * 9 + 50), './videos/normalLessThan10Min.mp4')).resolves.toBe(false);
    })
})


describe('Test function isVideoWithAudioTrack', () => {
    it('with audio track', async () => {
        await expect(isVideoWithAudioTrack('./videos/normalLessThan1Min.mp4')).resolves.toBe(true);
        await expect(isVideoWithAudioTrack('./videos/normalLessThan2Min.mp4')).resolves.toBe(true);
        await expect(isVideoWithAudioTrack('./videos/normalLessThan10Min.mp4')).resolves.toBe(true);
        await expect(isVideoWithAudioTrack('./videos/normalLessThan15Min.mp4')).resolves.toBe(true);
        await expect(isVideoWithAudioTrack('./videos/audioTooSoft.mp4')).resolves.toBe(true);
        await expect(isVideoWithAudioTrack('./videos/noSoundWithAudioTrack.mp4')).resolves.toBe(true);
        await expect(isVideoWithAudioTrack('./videos/noSoundWithAudioTrack2.mp4')).resolves.toBe(true);
    })
    it('without audio track', async () => {
        await expect(isVideoWithAudioTrack('./videos/noSoundWithoutAudioTrack.mp4')).resolves.toBe(false);
    })
})


describe('Test function getAudioLength', () => {
    it('<1min', async () => {
        await expect(getAudioLength('./videos/normalLessThan1Min.mp4')).resolves.toBeLessThan(60 * 1);
        await expect(getAudioLength('./videos/normalLessThan1Min.mp4')).resolves.toBeLessThan(60 * 5);

        await expect(getAudioLength('./videos/noSoundWithoutAudioTrack.mp4')).resolves.toBeLessThan(60 * 1);
        await expect(getAudioLength('./videos/noSoundWithoutAudioTrack.mp4')).resolves.toBeLessThan(60 * 5);

        await expect(getAudioLength('./videos/noSoundWithAudioTrack.mp4')).resolves.toBeLessThan(60 * 1);
        await expect(getAudioLength('./videos/noSoundWithAudioTrack.mp4')).resolves.toBeLessThan(60 * 5);

        await expect(getAudioLength('./videos/noSoundWithAudioTrack2.mp4')).resolves.toBeLessThan(60 * 1);
        await expect(getAudioLength('./videos/noSoundWithAudioTrack2.mp4')).resolves.toBeLessThan(60 * 5);
    })
    it('1min-5min', async () => {
        await expect(getAudioLength('./videos/normalLessThan2Min.mp4')).resolves.toBeGreaterThan(60 * 1);
        await expect(getAudioLength('./videos/normalLessThan2Min.mp4')).resolves.toBeLessThan(60 * 5);

        await expect(getAudioLength('./videos/audioTooSoft.mp4')).resolves.toBeGreaterThan(60 * 1);
        await expect(getAudioLength('./videos/audioTooSoft.mp4')).resolves.toBeLessThan(60 * 5);
    })
    it('>5min', async () => {
        await expect(getAudioLength('./videos/normalLessThan10Min.mp4')).resolves.toBeGreaterThan(60 * 1);
        await expect(getAudioLength('./videos/normalLessThan10Min.mp4')).resolves.toBeGreaterThan(60 * 5);

        await expect(getAudioLength('./videos/normalLessThan15Min.mp4')).resolves.toBeGreaterThan(60 * 1);
        await expect(getAudioLength('./videos/normalLessThan15Min.mp4')).resolves.toBeGreaterThan(60 * 5);
    })
    it('precise', async () => {
        await expect(getAudioLength('./videos/normalLessThan1Min.mp4')).resolves.toBeGreaterThan((60 * 0 + 45));
        await expect(getAudioLength('./videos/normalLessThan1Min.mp4')).resolves.toBeLessThan((60 * 0 + 47));

        await expect(getAudioLength('./videos/normalLessThan2Min.mp4')).resolves.toBeGreaterThan((60 * 1 + 41));
        await expect(getAudioLength('./videos/normalLessThan2Min.mp4')).resolves.toBeLessThan((60 * 1 + 43));

        await expect(getAudioLength('./videos/normalLessThan10Min.mp4')).resolves.toBeGreaterThan((60 * 9 + 48));
        await expect(getAudioLength('./videos/normalLessThan10Min.mp4')).resolves.toBeLessThan((60 * 9 + 50));
    })
})


describe('Test function getSilenceDuration', () => {
    it('has sound', async () => {
        await expect(getSilenceDuration('./videos/normalLessThan1Min.mp4')).resolves.toBe(-1);
        await expect(getSilenceDuration('./videos/normalLessThan10Min.mp4')).resolves.toBe(-1);
        await expect(getSilenceDuration('./videos/audioTooSoft.mp4')).resolves.toBe(-1);
        await expect(getSilenceDuration('./videos/noSoundWithoutAudioTrack.mp4')).resolves.toBe(-1);
    })
    it('is silent', async () => {
        await expect(getSilenceDuration('./videos/noSoundWithAudioTrack.mp4')).resolves.toBeGreaterThan(17);
        await expect(getSilenceDuration('./videos/noSoundWithAudioTrack2.mp4')).resolves.toBeGreaterThan(6);
    })
    it('deal with "Too many packets buffered for output stream."', async () => {
        await expect(getSilenceDuration('./videos/TooManyPacketsBufferedForOutputStream.mp4')).resolves.toBe(-1);
    })
    it('throw error (file not found)', async () => {
        await expect(getSilenceDuration('./videos/notFound.mp4')).rejects.toThrow();
    })
})


describe('Test function isSilent', () => {
    it('has sound', async () => {
        await expect(isSilent('./videos/normalLessThan1Min.mp4')).resolves.toBe(false);
        await expect(isSilent('./videos/normalLessThan10Min.mp4')).resolves.toBe(false);
        await expect(isSilent('./videos/audioTooSoft.mp4')).resolves.toBe(false);
    })
    it('is silent', async () => {
        await expect(isSilent('./videos/noSoundWithoutAudioTrack.mp4')).resolves.toBe(true);
        await expect(isSilent('./videos/noSoundWithAudioTrack.mp4')).resolves.toBe(true);
        await expect(isSilent('./videos/noSoundWithAudioTrack2.mp4')).resolves.toBe(true);
    })
})