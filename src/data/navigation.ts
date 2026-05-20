import type { NavItem } from '../types';
import {
  MdAccountBalance,
  MdWavingHand,
  MdSchool,
  MdMenuBook,
  MdFolderOpen,
  MdForum,
  MdChatBubble,
  MdChurch,
} from 'react-icons/md';

const navigation: NavItem[] = [
  {
    label: '학교소개',
    path: '/about',
    icon: MdAccountBalance,
  },
  {
    label: '학장인사',
    path: '/greeting',
    icon: MdWavingHand,
  },
  {
    label: '입학안내',
    path: '/admission',
    icon: MdSchool,
  },
  {
    label: '강의실',
    icon: MdMenuBook,
    children: [
      { label: '학부강의실', path: '/undergraduate' },
      { label: '신대원 및 연구원', path: '/graduate' },
    ],
  },
  {
    label: '자료실',
    icon: MdFolderOpen,
    children: [
      { label: '동영상자료실', path: '/video-library' },
      { label: '일반자료실', path: '/document-library' },
    ],
  },
  {
    label: '커뮤니티',
    path: '/community',
    icon: MdForum,
  },
  {
    label: '자유게시판',
    path: '/board',
    icon: MdChatBubble,
  },
  {
    label: '경기총회',
    path: '/assembly',
    icon: MdChurch,
  },
];

export default navigation;
