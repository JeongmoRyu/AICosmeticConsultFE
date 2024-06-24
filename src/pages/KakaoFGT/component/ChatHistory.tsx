import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Images from 'assets/styles/Images';
import { useGetMemberChat } from 'api/FGTQueries';
import { dateTimeFormat } from 'utils/utility';
import { MemberInfoPropsType } from 'types';

interface Props {
  memberInfo: MemberInfoPropsType;
  onChatSubmit: (message: string) => void;
}

const CHAT_CELL_WIDTH = ['15%', '20%', 'auto'];

const ChatHistory = ({ memberInfo, onChatSubmit }: Props) => {
  const [isShowWrite, setIsShowWrite] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [chatText, setChatText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isSuccess } = useGetMemberChat(memberInfo.id);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current?.scrollHeight }), 500);
  }, [data]);

  const handleToggleWrite = () => setIsShowWrite(!isShowWrite);
  const handleWriteOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value);
    setIsDisabledButton(!e.target.value);
  };
  const onSubmit = () => {
    if (chatText) {
      onChatSubmit(chatText);
      setChatText('');
    }
  };

  return (
    <Wrap>
      <ScrollWrap>
        <ScrollArea ref={scrollRef}>
          <table>
            <caption className='screen_hide'>대화 내용</caption>
            <colgroup>
              <col width={CHAT_CELL_WIDTH[0]} />
              <col width={CHAT_CELL_WIDTH[1]} />
              <col width={CHAT_CELL_WIDTH[2]} />
            </colgroup>
            <thead>
              <tr>
                <th scope='col'>이름</th>
                <th scope='col'>시각</th>
                <th scope='col'>대화 내용</th>
              </tr>
            </thead>
            {isSuccess &&
              (data.length > 0 ? (
                <tbody>
                  {data.map((item) => (
                    <tr key={`${item.room_id}_${item.id}`} className={item.role === 'user' ? 'bg_gray' : ''}>
                      <td>{item.role === 'user' ? memberInfo.name : 'Pro AI'}</td>
                      <td>{dateTimeFormat(item.created_at)}</td>
                      <td className='text_left'>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={3}>대화 이력이 없습니다.</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </ScrollArea>
      </ScrollWrap>

      <WriteWrap $isShowWrite={isShowWrite}>
        <h2 className='screen_hide'>수정 답변 보내기</h2>
        <ButtonOpen type='button' onClick={handleToggleWrite}>
          열기
        </ButtonOpen>
        <textarea placeholder='내용을 입력해 주세요.' onChange={handleWriteOnChange} value={chatText}></textarea>
        <ButtonSubmit disabled={isDisabledButton} onClick={onSubmit}>
          전송
        </ButtonSubmit>
      </WriteWrap>
    </Wrap>
  );
};

export default ChatHistory;

const ScrollWrap = styled.div`
  position: relative;
  height: calc(100% - 50px);
  margin-top: 50px;
`;
const Wrap = styled.div`
  position: relative;
  flex: 1;
  margin-left: 30px;
  ${ScrollWrap} {
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  th {
    text-align: center;
    &:nth-child(1) {
      width: ${CHAT_CELL_WIDTH[0]};
    }
    &:nth-child(2) {
      width: ${CHAT_CELL_WIDTH[1]};
    }
    &:nth-child(3) {
      width: ${CHAT_CELL_WIDTH[2]};
    }
  }
  td {
    padding: 10px;
    line-height: 1.3;
    word-wrap: break-word;
    vertical-align: top;
  }
  .bg_gray {
    background-color: var(--lightGray);
  }
`;
const ScrollArea = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;
const ButtonOpen = styled.button.attrs({ type: 'button' })`
  z-index: 1;
  position: absolute;
  top: -30px;
  right: -1px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  padding-top: 4px;
  border: 1px solid var(--primary);
  border-bottom: 0;
  background-color: var(--white);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 0;
  line-height: 0;
  text-indent: 100%;
  &:before {
    content: '';
    display: block;
    mask: url(${Images.iconArrow}) no-repeat 0 0 / 8px 14px;
    background-color: var(--primary);
    width: 8px;
    height: 14px;
    transition: transform 0.3s;
  }
`;
const ButtonSubmit = styled.button.attrs({ type: 'button' })`
  display: inline-block;
  width: 70px;
  height: 30px;
  margin-bottom: 15px;
  background-color: var(--primary);
  border-radius: 5px;
  color: var(--white);
  vertical-align: bottom;
  &:disabled {
    background-color: var(--lightGray);
    color: var(--gray);
  }
`;
const WriteWrap = styled.div<{ $isShowWrite }>`
  z-index: 1;
  position: absolute;
  left: 25px;
  right: 25px;
  bottom: -1px;
  max-height: ${({ $isShowWrite }) => ($isShowWrite ? '100vh' : '0')};
  padding-left: 25px;
  padding-right: 15px;
  border: 1px solid var(--primary);
  background-color: var(--white);
  border-top-left-radius: 5px;
  transition: max-height ${({ $isShowWrite }) => ($isShowWrite ? '0.7s' : '0.1s')} ease-in-out;
  textarea {
    display: inline-block;
    width: calc(100% - 15px - 70px);
    height: 105px;
    margin-top: 20px;
    margin-bottom: 15px;
    margin-right: 15px;
    border: 0;
    resize: none;
    vertical-align: top;
  }
  ${ButtonOpen}:before {
    transform: ${({ $isShowWrite }) => ($isShowWrite ? 'rotate(90deg)' : 'rotate(270deg)')};
  }
`;
