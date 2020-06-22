import {types} from "mediasoup-client";
import {computed, observable} from 'mobx';
import {MediaState, MediaSource} from "@bitlink/common/interfaces/WebRTC";


export interface ParticipantData {
    id: string,
    name: string,
    isHost: boolean,
    isMe: boolean,
    isAlive: boolean,
    mediaState: MediaState,
    mediasoup: {
        consumer: {
            [key in MediaSource]: types.Consumer | null
        }
    }
}

export default class Participant {
    @observable id: string;
    @observable name: string;
    @observable isHost: boolean;
    @observable isMe: boolean;
    @observable isAlive: boolean;
    @observable mediaState: MediaState;
    @observable mediasoup: {
        consumer: {
            [key in MediaSource]: types.Consumer | null
        }
    };

    constructor(data: ParticipantData) {
        this.id = data.id;
        this.name = data.name;
        this.isHost = data.isHost;
        this.isMe = data.isMe;
        this.isAlive = data.isAlive;
        this.mediaState = data.mediaState;
        this.mediasoup = data.mediasoup;
    }

    @computed
    get hasVideo(): boolean {
        return this.mediaState.camera && !!this.mediasoup.consumer.camera
    }

    @computed
    get hasAudio(): boolean {
        return this.mediaState.microphone && !!this.mediasoup.consumer.microphone
    }

    @computed
    get hasScreen(): boolean {
        return this.mediaState.screen && !!this.mediasoup.consumer.screen
    }
}
