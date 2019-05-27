const { alias } = require("./alias")

const originBlocks = {
  motion_movesteps: [
    "motion_movesteps",
    [
      {
        name: "STEPS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  motion_turnright: [
    "motion_turnright",
    [
      {
        name: "DEGREES",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "15"
      }
    ]
  ],
  motion_turnleft: [
    "motion_turnleft",
    [
      {
        name: "DEGREES",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "15"
      }
    ]
  ],
  motion_goto: [
    "motion_goto",
    [
      {
        name: "TO",
        shadowName: "TO",
        shadowType: "motion_goto_menu",
        defaultValue: "_random_"
      }
    ]
  ],
  motion_gotoxy: [
    "motion_gotoxy",
    [
      {
        name: "X",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      },
      {
        name: "Y",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      }
    ]
  ],
  motion_glideto: [
    "motion_glideto",
    [
      {
        name: "SECS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "1"
      },
      {
        name: "TO",
        shadowName: "TO",
        shadowType: "motion_glideto_menu",
        defaultValue: "_random_"
      }
    ]
  ],
  motion_glidesecstoxy: [
    "motion_glidesecstoxy",
    [
      {
        name: "SECS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "1"
      },
      {
        name: "X",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      },
      {
        name: "Y",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      }
    ]
  ],
  motion_pointindirection: [
    "motion_pointindirection",
    [
      {
        name: "DIRECTION",
        shadowName: "NUM",
        shadowType: "math_angle",
        defaultValue: "90"
      }
    ]
  ],
  motion_pointtowards: [
    "motion_pointtowards",
    [
      {
        name: "TOWARDS",
        shadowName: "TOWARDS",
        shadowType: "motion_pointtowards_menu",
        defaultValue: "_mouse_"
      }
    ]
  ],
  motion_changexby: [
    "motion_changexby",
    [
      {
        name: "DX",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  motion_setx: [
    "motion_setx",
    [
      {
        name: "X",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      }
    ]
  ],
  motion_changeyby: [
    "motion_changeyby",
    [
      {
        name: "DY",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  motion_sety: [
    "motion_sety",
    [
      {
        name: "Y",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      }
    ]
  ],
  motion_ifonedgebounce: ["motion_ifonedgebounce"],
  motion_setrotationstyle: ["motion_setrotationstyle"],
  motion_xposition: ["motion_xposition"],
  motion_yposition: ["motion_yposition"],
  motion_direction: ["motion_direction"],
  looks_sayforsecs: [
    "looks_sayforsecs",
    [
      {
        name: "MESSAGE",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "你好！"
      },
      {
        name: "SECS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "2"
      }
    ]
  ],
  looks_say: [
    "looks_say",
    [
      {
        name: "MESSAGE",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "你好！"
      }
    ]
  ],
  looks_thinkforsecs: [
    "looks_thinkforsecs",
    [
      {
        name: "MESSAGE",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "嗯……"
      },
      {
        name: "SECS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "2"
      }
    ]
  ],
  looks_think: [
    "looks_think",
    [
      {
        name: "MESSAGE",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "嗯……"
      }
    ]
  ],
  looks_switchcostumeto: [
    "looks_switchcostumeto",
    [
      {
        name: "COSTUME",
        shadowName: "COSTUME",
        shadowType: "looks_costume",
        defaultValue: "造型1"
      }
    ]
  ],
  looks_nextcostume: ["looks_nextcostume"],
  looks_switchbackdropto: [
    "looks_switchbackdropto",
    [
      {
        name: "BACKDROP",
        shadowName: "BACKDROP",
        shadowType: "looks_backdrops",
        defaultValue: "背景1"
      }
    ]
  ],
  looks_nextbackdrop: ["looks_nextbackdrop"],
  looks_changesizeby: [
    "looks_changesizeby",
    [
      {
        name: "CHANGE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  looks_setsizeto: [
    "looks_setsizeto",
    [
      {
        name: "SIZE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "100"
      }
    ]
  ],
  looks_changeeffectby: [
    "looks_changeeffectby",
    [
      {
        name: "CHANGE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "25"
      }
    ]
  ],
  looks_seteffectto: [
    "looks_seteffectto",
    [
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0"
      }
    ]
  ],
  looks_cleargraphiceffects: ["looks_cleargraphiceffects"],
  looks_show: ["looks_show"],
  looks_hide: ["looks_hide"],
  looks_gotofrontback: ["looks_gotofrontback"],
  looks_goforwardbackwardlayers: [
    "looks_goforwardbackwardlayers",
    [
      {
        name: "NUM",
        shadowName: "NUM",
        shadowType: "math_integer",
        defaultValue: "1"
      }
    ]
  ],
  looks_costumenumbername: ["looks_costumenumbername"],
  looks_backdropnumbername: ["looks_backdropnumbername"],
  looks_size: ["looks_size"],
  sound_playuntildone: [
    "sound_playuntildone",
    [
      {
        name: "SOUND_MENU",
        shadowName: "SOUND_MENU",
        shadowType: "sound_sounds_menu",
        defaultValue: ""
      }
    ]
  ],
  sound_play: [
    "sound_play",
    [
      {
        name: "SOUND_MENU",
        shadowName: "SOUND_MENU",
        shadowType: "sound_sounds_menu",
        defaultValue: ""
      }
    ]
  ],
  sound_stopallsounds: ["sound_stopallsounds"],
  sound_changeeffectby: [
    "sound_changeeffectby",
    [
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  sound_seteffectto: [
    "sound_seteffectto",
    [
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "100"
      }
    ]
  ],
  sound_cleareffects: ["sound_cleareffects"],
  sound_changevolumeby: [
    "sound_changevolumeby",
    [
      {
        name: "VOLUME",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "-10"
      }
    ]
  ],
  sound_setvolumeto: [
    "sound_setvolumeto",
    [
      {
        name: "VOLUME",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "100"
      }
    ]
  ],
  sound_volume: ["sound_volume"],
  event_whenflagclicked: ["event_whenflagclicked"],
  event_whenkeypressed: ["event_whenkeypressed"],
  event_whenthisspriteclicked: ["event_whenthisspriteclicked"],
  event_whenbackdropswitchesto: ["event_whenbackdropswitchesto"],
  event_whengreaterthan: [
    "event_whengreaterthan",
    [
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  event_whenbroadcastreceived: ["event_whenbroadcastreceived"],
  event_broadcast: [
    "event_broadcast",
    [
      {
        name: "BROADCAST_INPUT",
        shadowName: "BROADCAST_OPTION",
        shadowType: "event_broadcast_menu",
        defaultValue: "消息1"
      }
    ]
  ],
  event_broadcastandwait: [
    "event_broadcastandwait",
    [
      {
        name: "BROADCAST_INPUT",
        shadowName: "BROADCAST_OPTION",
        shadowType: "event_broadcast_menu",
        defaultValue: "消息1"
      }
    ]
  ],
  control_wait: [
    "control_wait",
    [
      {
        name: "DURATION",
        shadowName: "NUM",
        shadowType: "math_positive_number",
        defaultValue: "1"
      }
    ]
  ],
  control_repeat: [
    "control_repeat",
    [
      {
        name: "TIMES",
        shadowName: "NUM",
        shadowType: "math_whole_number",
        defaultValue: "10"
      }
    ]
  ],
  control_forever: ["control_forever"],
  control_if: ["control_if"],
  control_if_else: ["control_if_else"],
  control_wait_until: ["control_wait_until"],
  control_repeat_until: ["control_repeat_until"],
  control_stop: ["control_stop"],
  control_start_as_clone: ["control_start_as_clone"],
  control_create_clone_of: [
    "control_create_clone_of",
    [
      {
        name: "CLONE_OPTION",
        shadowName: "CLONE_OPTION",
        shadowType: "control_create_clone_of_menu",
        defaultValue: "_myself_"
      }
    ]
  ],
  control_delete_this_clone: ["control_delete_this_clone"],
  sensing_touchingobject: [
    "sensing_touchingobject",
    [
      {
        name: "TOUCHINGOBJECTMENU",
        shadowName: "TOUCHINGOBJECTMENU",
        shadowType: "sensing_touchingobjectmenu",
        defaultValue: "_mouse_"
      }
    ]
  ],
  sensing_touchingcolor: [
    "sensing_touchingcolor",
    [
      {
        name: "COLOR",
        shadowName: "COLOUR",
        shadowType: "colour_picker",
        defaultValue: "#e24421"
      }
    ]
  ],
  sensing_coloristouchingcolor: [
    "sensing_coloristouchingcolor",
    [
      {
        name: "COLOR",
        shadowName: "COLOUR",
        shadowType: "colour_picker",
        defaultValue: "#a28852"
      },
      {
        name: "COLOR2",
        shadowName: "COLOUR",
        shadowType: "colour_picker",
        defaultValue: "#bdf8ab"
      }
    ]
  ],
  sensing_distanceto: [
    "sensing_distanceto",
    [
      {
        name: "DISTANCETOMENU",
        shadowName: "DISTANCETOMENU",
        shadowType: "sensing_distancetomenu",
        defaultValue: "_mouse_"
      }
    ]
  ],
  sensing_askandwait: [
    "sensing_askandwait",
    [
      {
        name: "QUESTION",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "What's your name?"
      }
    ]
  ],
  sensing_answer: ["sensing_answer"],
  sensing_keypressed: [
    "sensing_keypressed",
    [
      {
        name: "KEY_OPTION",
        shadowName: "KEY_OPTION",
        shadowType: "sensing_keyoptions",
        defaultValue: "space"
      }
    ]
  ],
  sensing_mousedown: ["sensing_mousedown"],
  sensing_mousex: ["sensing_mousex"],
  sensing_mousey: ["sensing_mousey"],
  sensing_setdragmode: ["sensing_setdragmode"],
  sensing_loudness: ["sensing_loudness"],
  sensing_timer: ["sensing_timer"],
  sensing_resettimer: ["sensing_resettimer"],
  sensing_of: [
    "sensing_of",
    [
      {
        name: "OBJECT",
        shadowName: "OBJECT",
        shadowType: "sensing_of_object_menu",
        defaultValue: "_stage_"
      }
    ]
  ],
  sensing_current: ["sensing_current"],
  sensing_dayssince2000: ["sensing_dayssince2000"],
  sensing_username: ["sensing_username"],
  operator_add: [
    "operator_add",
    [
      {
        name: "NUM1",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      },
      {
        name: "NUM2",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  operator_subtract: [
    "operator_subtract",
    [
      {
        name: "NUM1",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      },
      {
        name: "NUM2",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  operator_multiply: [
    "operator_multiply",
    [
      {
        name: "NUM1",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      },
      {
        name: "NUM2",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  operator_divide: [
    "operator_divide",
    [
      {
        name: "NUM1",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      },
      {
        name: "NUM2",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  operator_random: [
    "operator_random",
    [
      {
        name: "FROM",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "1"
      },
      {
        name: "TO",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  operator_gt: [
    "operator_gt",
    [
      {
        name: "OPERAND1",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: ""
      },
      {
        name: "OPERAND2",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "50"
      }
    ]
  ],
  operator_lt: [
    "operator_lt",
    [
      {
        name: "OPERAND1",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: ""
      },
      {
        name: "OPERAND2",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "50"
      }
    ]
  ],
  operator_equals: [
    "operator_equals",
    [
      {
        name: "OPERAND1",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: ""
      },
      {
        name: "OPERAND2",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "50"
      }
    ]
  ],
  operator_and: ["operator_and"],
  operator_or: ["operator_or"],
  operator_not: ["operator_not"],
  operator_join: [
    "operator_join",
    [
      {
        name: "STRING1",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "apple "
      },
      {
        name: "STRING2",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "banana"
      }
    ]
  ],
  operator_letter_of: [
    "operator_letter_of",
    [
      {
        name: "STRING",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "apple"
      },
      {
        name: "LETTER",
        shadowName: "NUM",
        shadowType: "math_whole_number",
        defaultValue: "1"
      }
    ]
  ],
  operator_length: [
    "operator_length",
    [
      {
        name: "STRING",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "apple"
      }
    ]
  ],
  operator_contains: [
    "operator_contains",
    [
      {
        name: "STRING1",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "apple"
      },
      {
        name: "STRING2",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "a"
      }
    ]
  ],
  operator_mod: [
    "operator_mod",
    [
      {
        name: "NUM1",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      },
      {
        name: "NUM2",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  operator_round: [
    "operator_round",
    [
      {
        name: "NUM",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  operator_mathop: [
    "operator_mathop",
    [
      {
        name: "NUM",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: ""
      }
    ]
  ],
  data_variable: ["data_variable"],
  data_setvariableto: [
    "data_setvariableto",
    [
      {
        name: "VALUE",
        shadowName: "TEXT",
        shadowType: "text",
        defaultValue: "0"
      }
    ]
  ],
  data_changevariableby: [
    "data_changevariableby",
    [
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "1"
      }
    ]
  ],
  data_showvariable: ["data_showvariable"],
  data_hidevariable: ["data_hidevariable"],
  pen_clear: ["pen_clear"],
  pen_stamp: ["pen_stamp"],
  pen_penDown: ["pen_penDown"],
  pen_penUp: ["pen_penUp"],
  pen_setPenColorToColor: [
    "pen_setPenColorToColor",
    [
      {
        name: "COLOR",
        shadowName: "COLOUR",
        shadowType: "colour_picker",
        defaultValue: "#d02626"
      }
    ]
  ],
  pen_changePenColorParamBy: [
    "pen_changePenColorParamBy",
    [
      {
        name: "COLOR_PARAM",
        shadowName: "colorParam",
        shadowType: "pen_menu_colorParam",
        defaultValue: "color"
      },
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "10"
      }
    ]
  ],
  pen_setPenColorParamTo: [
    "pen_setPenColorParamTo",
    [
      {
        name: "COLOR_PARAM",
        shadowName: "colorParam",
        shadowType: "pen_menu_colorParam",
        defaultValue: "color"
      },
      {
        name: "VALUE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "50"
      }
    ]
  ],
  pen_changePenSizeBy: [
    "pen_changePenSizeBy",
    [
      {
        name: "SIZE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "1"
      }
    ]
  ],
  pen_setPenSizeTo: [
    "pen_setPenSizeTo",
    [
      {
        name: "SIZE",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "1"
      }
    ]
  ],
  music_playDrumForBeats: [
    "music_playDrumForBeats",
    [
      {
        name: "DRUM",
        shadowName: "DRUM",
        shadowType: "music_menu_DRUM",
        defaultValue: "1"
      },
      {
        name: "BEATS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0.25"
      }
    ]
  ],
  music_restForBeats: [
    "music_restForBeats",
    [
      {
        name: "BEATS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0.25"
      }
    ]
  ],
  music_playNoteForBeats: [
    "music_playNoteForBeats",
    [
      {
        name: "NOTE",
        shadowName: "NOTE",
        shadowType: "note",
        defaultValue: "60"
      },
      {
        name: "BEATS",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "0.25"
      }
    ]
  ],
  music_setInstrument: [
    "music_setInstrument",
    [
      {
        name: "INSTRUMENT",
        shadowName: "INSTRUMENT",
        shadowType: "music_menu_INSTRUMENT",
        defaultValue: "1"
      }
    ]
  ],
  music_setTempo: [
    "music_setTempo",
    [
      {
        name: "TEMPO",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "60"
      }
    ]
  ],
  music_changeTempo: [
    "music_changeTempo",
    [
      {
        name: "TEMPO",
        shadowName: "NUM",
        shadowType: "math_number",
        defaultValue: "20"
      }
    ]
  ],
  music_getTempo: ["music_getTempo"]
}
/**
 * block type 字典
 *
 *
 */
const blocks = {
  ...originBlocks,
  data_itemoflist: [
    "data_itemoflist",
    [
      {
        name: "INDEX",
        shadowName: "NUM",
        shadowType: "math_integer",
        defaultValue: "1"
      }
    ]
  ],
  control_if: ["control_if", [{ name: "CONDITION" }]],
  control_if_else: ["control_if_else", [{ name: "CONDITION" }]]
}

/**
 * ast identity 对应的 block积木类型
 */
const map = {
  movesteps: "motion_movesteps",
  turnright: "motion_turnright",
  turnleft: "motion_turnleft",
  goto: "motion_goto",
  gotoxy: "motion_gotoxy",
  glideto: "motion_glideto",
  glidesecstoxy: "motion_glidesecstoxy",
  pointindirection: "motion_pointindirection",
  pointtowards: "motion_pointtowards",
  changexby: "motion_changexby",
  setx: "motion_setx",
  changeyby: "motion_changeyby",
  sety: "motion_sety",
  ifonedgebounce: "motion_ifonedgebounce",
  setrotationstyle: "motion_setrotationstyle",
  xposition: "motion_xposition",
  yposition: "motion_yposition",
  direction: "motion_direction",
  sayforsecs: "looks_sayforsecs",
  say: "looks_say",
  thinkforsecs: "looks_thinkforsecs",
  think: "looks_think",
  switchcostumeto: "looks_switchcostumeto",
  nextcostume: "looks_nextcostume",
  //alias nextCostumes
  nextCostumes: "looks_nextcostume",
  switchbackdropto: "looks_switchbackdropto",
  nextbackdrop: "looks_nextbackdrop",
  changesizeby: "looks_changesizeby",
  setsizeto: "looks_setsizeto",
  changeeffectby: "sound_changeeffectby",
  seteffectto: "sound_seteffectto",
  cleargraphiceffects: "looks_cleargraphiceffects",
  show: "looks_show",
  hide: "looks_hide",
  gotofrontback: "looks_gotofrontback",
  goforwardbackwardlayers: "looks_goforwardbackwardlayers",
  costumenumbername: "looks_costumenumbername",
  backdropnumbername: "looks_backdropnumbername",
  size: "looks_size",
  playuntildone: "sound_playuntildone",
  play: "sound_play",
  stopallsounds: "sound_stopallsounds",
  cleareffects: "sound_cleareffects",
  changevolumeby: "sound_changevolumeby",
  setvolumeto: "sound_setvolumeto",
  volume: "sound_volume",
  //alias onStart
  onStart: "event_whenflagclicked",
  whenflagclicked: "event_whenflagclicked",
  whenkeypressed: "event_whenkeypressed",
  whenthisspriteclicked: "event_whenthisspriteclicked",
  whenbackdropswitchesto: "event_whenbackdropswitchesto",
  whengreaterthan: "event_whengreaterthan",
  whenbroadcastreceived: "event_whenbroadcastreceived",
  broadcast: "event_broadcast",
  broadcastandwait: "event_broadcastandwait",
  wait: "control_wait",
  //alias sleep
  sleep: "control_wait",
  repeat: "control_repeat",
  forever: "control_forever",
  if: "control_if",
  ifElse: "control_if_else",
  waitUntil: "control_wait_until",
  repeatUntil: "control_repeat_until",
  stop: "control_stop",
  startAsClone: "control_start_as_clone",
  createCloneOf: "control_create_clone_of",
  deleteThisClone: "control_delete_this_clone",
  touchingobject: "sensing_touchingobject",
  touchingcolor: "sensing_touchingcolor",
  coloristouchingcolor: "sensing_coloristouchingcolor",
  distanceto: "sensing_distanceto",
  askandwait: "sensing_askandwait",
  answer: "sensing_answer",
  keypressed: "sensing_keypressed",
  mousedown: "sensing_mousedown",
  mousex: "sensing_mousex",
  mousey: "sensing_mousey",
  setdragmode: "sensing_setdragmode",
  loudness: "sensing_loudness",
  timer: "sensing_timer",
  resettimer: "sensing_resettimer",
  of: "sensing_of",
  current: "sensing_current",
  dayssince2000: "sensing_dayssince2000",
  username: "sensing_username",
  add: "operator_add",
  subtract: "operator_subtract",
  multiply: "operator_multiply",
  divide: "operator_divide",
  random: "operator_random",
  /**alias + - * / */
  "+": "operator_add",
  "-": "operator_subtract",
  "*": "operator_multiply",
  "/": "operator_divide",
  /**alias + - * / */

  gt: "operator_gt",
  ">": "operator_gt",
  lt: "operator_lt",
  "<": "operator_lt",
  /**alias + - * / */
  "==": "operator_equals",
  equals: "operator_equals",
  and: "operator_and",
  or: "operator_or",
  not: "operator_not",
  join: "operator_join",
  letterOf: "operator_letter_of",
  length: "operator_length",
  contains: "operator_contains",
  mod: "operator_mod",
  //alias %
  "%": "operator_mod",
  round: "operator_round",
  mathop: "operator_mathop",
  //alias 绝对值相关的方法
  abs: "operator_mathop",
  floor: "operator_mathop",
  ceiling: "operator_mathop",
  sqrt: "operator_mathop",
  sin: "operator_mathop",
  cos: "operator_mathop",
  tan: "operator_mathop",
  asin: "operator_mathop",
  acos: "operator_mathop",
  atan: "operator_mathop",
  in: "operator_mathop",
  log: "operator_mathop",
  variable: "data_variable",
  setvariableto: "data_setvariableto",
  changevariableby: "data_changevariableby",
  showvariable: "data_showvariable",
  hidevariable: "data_hidevariable",
  ...alias
}

module.exports = {
  blocks,
  map
}
