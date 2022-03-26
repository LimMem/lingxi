import { getStyleObjectByKeys } from './todoStyle';

export default {
  compLib: 'html',
  compType: 1,
  isBusiObjContainer: false,
  isContainer: false,
  label: '超链接',
  props: {
    name: '超链接',
    href: '',
    children: '超链接',
    target: '_self',
  },
  style: {},
  type: 'A',
  platform: 'h5',
  description: '',
  isInlineBlock: true,
  image: '',
  groupsName: '基础',
  todoActionList: ['setCompChildrenValue', 'setHref'],
  todoEvents: [
    {
      label: '点击事件',
      value: 'onClick',
    },
  ],
  todoProps: {
    name: {
      label: '名称',
      type: 'Input',
      groupsName: '基础',
      istodoBind: false,
      props: {
        required: false,
      },
    },
    href: {
      label: '链接地址',
      type: 'Input',
      groupsName: '其他',
      istodoBind: true,
      props: {},
    },
    content: {
      label: '文本内容',
      type: 'TextArea',
      groupsName: '基础',
      istodoBind: true,
      props: {},
    },
    target: {
      label: '打开目标',
      type: 'Select',
      groupsName: '其他',
      istodoBind: true,
      props: {
        options: [
          {
            title: '新窗口打开',
            value: '_blank',
          },
          {
            title: '在父窗口打开',
            value: '_parent',
          },
          {
            title: '当前页面跳转',
            value: '_self',
          },
          {
            title: '替换当前的整个窗体',
            value: '_top',
          },
        ],
      },
    },
  },
  todoStyles: getStyleObjectByKeys([
    'width',
    'height',
    'padding',
    'margin',
    'color',
    'textAlign',
    'fontSize',
    'fontWeight',
    'backgroundColor',
    'customStyle',
  ]),
};
