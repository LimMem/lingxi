const todoStyleList = {
  backgroundColor: {
    label: '背景色',
    groupsName: '背景颜色',
    type: 'ColorPicker',
  },
  position: {
    label: '定位',
    type: 'Select',
    groupsName: '布局',
    props: {
      options: [
        { title: '绝对定位[absolute]', value: 'absolute' },
        { title: '绝对定位[fixed]', value: 'fixed' },
        { title: '相对定位[relative]', value: 'relative' },
        { title: '默认值[static]', value: 'static' },
        { title: '继承[inherit]', value: 'inherit' },
      ],
      children: {
        top: {
          label: '顶部边缘',
          type: 'AbsoluteInput',
          props: {
            dependProps: ['position', ['fixed', 'absolute']],
          },
        },
        right: {
          label: '右部边缘',
          type: 'AbsoluteInput',
          props: {
            dependProps: ['position', ['fixed', 'absolute']],
          },
        },
        bottom: {
          label: '底部边缘',
          type: 'AbsoluteInput',
          props: {
            dependProps: ['position', ['fixed', 'absolute']],
          },
        },
        left: {
          label: '左部边缘',
          type: 'AbsoluteInput',
          props: {
            dependProps: ['position', ['fixed', 'absolute']],
          },
        },
        zIndex: {
          label: '层级',
          type: 'InputNumber',
          props: {
            dependProps: ['position', ['fixed', 'absolute', 'relative']],
          },
        },
      },
    },
  },
  display: {
    label: '显示',
    type: 'Display',
    groupsName: '布局',
  },
  flex: {
    label: 'flex',
    type: 'InputNumber',
    groupsName: '其他',
    props: {
      min: 0,
      visibleFlag: 'display',
      visibleFlagValue: ['flex'],
    },
  },
  padding: {
    label: '内边距',
    type: 'MarginInput',
    groupsName: '布局',
    props: {
      min: 0,
    },
  },
  margin: {
    label: '外边距',
    groupsName: '布局',
    type: 'MarginInput',
  },
  width: {
    label: '宽度',
    groupsName: '布局',
    type: 'HeightInput',
  },
  height: {
    label: '高度',
    groupsName: '布局',
    type: 'HeightInput',
  },
  borderRadius: {
    label: '圆角边框',
    type: 'InputNumber',
    groupsName: '边框',
  },
  borderWidth: {
    label: '边框宽度',
    type: 'InputNumber',
    groupsName: '边框',
  },
  borderColor: {
    label: '边框颜色',
    type: 'ColorPicker',
    groupsName: '边框',
  },
  overflowY: {
    label: '高度溢出',
    type: 'Select',
    groupsName: '其他',
    props: {
      options: [
        { title: '默认', value: 'visible' },
        { title: '区域隐藏', value: 'hidden' },
        { title: '区域自适应', value: 'auto' },
        { title: '区域滚动', value: 'scroll' },
      ],
    },
  },
  customStyle: {
    label: '自定义',
    type: 'CustomStyle',
    groupsName: '自定义',
  },
  color: {
    label: '字体颜色',
    type: 'ColorPicker',
    groupsName: '文字',
  },
  textAlign: {
    label: '文本对齐',
    type: 'Radio',
    groupsName: '文字',
    props: {
      options: [
        { title: '左对齐', value: 'left' },
        { title: '右对齐', value: 'right' },
        { title: '居中', value: 'center' },
      ],
    },
  },
  fontSize: {
    label: '文本大小',
    type: 'InputNumber',
    groupsName: '文字',
    props: {
      min: 12,
      max: 100,
    },
  },
  fontWeight: {
    label: '字重',
    type: 'InputNumber',
  },
  flexDirection: {
    label: '主轴方向',
    type: 'Select',
    groupsName: '布局',
    props: {
      visibleFlag: 'display',
      visibleFlagValue: ['flex'],
      options: [
        { title: '水平', value: 'row' },
        { title: '垂直', value: 'column' },
        { title: '逆向水平', value: 'row-reverse' },
        { title: '逆向垂直', value: 'column-reverse' },
      ],
    },
  },
  flexWrap: {
    label: '换行方式',
    type: 'Select',
    groupsName: '布局',
    props: {
      options: [
        { title: '不换行', value: 'nowrap' },
        { title: '换行', value: 'wrap' },
        { title: '逆向换行', value: 'wrap-reverse' },
      ],
    },
  },
  justifyContent: {
    label: '主轴对齐',
    type: 'Select',
    groupsName: '布局',
    props: {
      visibleFlag: 'display',
      visibleFlagValue: ['flex'],
      options: [
        { title: '起点对齐', value: 'flex-start' },
        { title: '终点对齐', value: 'flex-end' },
        { title: '居中', value: 'center' },
        { title: '两端对齐', value: 'space-between' },
        { title: '间隔对齐', value: 'space-around' },
      ],
    },
  },
  alignItems: {
    label: '交叉轴对齐',
    type: 'Select',
    groupsName: '布局',
    props: {
      visibleFlag: 'display',
      visibleFlagValue: ['flex'],
      options: [
        { title: '起点对齐', value: 'flex-start' },
        { title: '终点对齐', value: 'flex-end' },
        { title: '居中', value: 'center' },
        { title: '基线对齐', value: 'baseline' },
        { title: '拉伸对齐', value: 'stretch' },
      ],
    },
  },
  bottom: {
    label: '底部边缘',
    type: 'AbsoluteInput',
  },
  left: {
    label: '左部边缘',
    type: 'AbsoluteInput',
  },
  top: {
    label: '顶部边缘',
    type: 'AbsoluteInput',
  },
  right: {
    label: '右部边缘',
    type: 'AbsoluteInput',
  },
  themeColor: {
    groupsName: '主题',
    label: '主题色',
    type: 'ColorPicker',
  },
  className: {
    groupsName: '样式类',
    label: '样式类名',
    type: 'Input',
    // placeholder: '空格分隔',
    props: {
      placeholder: '空格分隔',
    }
  },
  letterSpacing: {
    groupsName: '文字',
    label: '字体间距',
    type: 'InputNumber',
    props: {
      min: 0,
      max: 100,
    }
  },
  lineHeight: {
    groupsName: '文字',
    label: '行高',
    type: 'InputNumber',
    props: {
      min: 12,
      max: 100,
    }
  },
};

// 通过key获取文字
const getStyleObjectByKeys = (styleKeyList = []) => {
  const styleObj = {};
  styleKeyList.forEach((styleKey) => {
    if (!styleKey) {
      return;
    }
    const style = todoStyleList[styleKey];
    if (!style) {
      // if (process.env.NODE_ENV === 'development') {
      //   throw new Error(
      //     `styleKeyList: ${styleKeyList} 不存在${styleKey}对象，请在todoStyle.js中添加${styleKey}。`,
      //   );
      // }
    }
    styleObj[styleKey] = style;
  });
  return styleObj;
};

export { getStyleObjectByKeys };
