/**
 * Created by lenovo on 2018/3/29.
 */
const WEEXDEFAULTDEVICEWidth = 750; //weex默认的屏幕宽度。
const DEVICEWIDTH = weex.config.env.deviceWidth;
const DEVICEHEIGHT = weex.config.env.deviceHeight;
const PLATFORM = weex.config.env.platform;
const config = {
    PAGESIZE: 10,
    PAGENO: 0,
    // DEVICEWIDTH: PLATFORM === 'Web' ? DEVICEWIDTH :  WEEXDEFAULTDEVICEWidth,
    DEVICEWIDTH: 750,
    DEVICEHEIGHT : PLATFORM === 'Web' ? DEVICEHEIGHT : WEEXDEFAULTDEVICEWidth / DEVICEWIDTH * DEVICEHEIGHT
};

export default config;