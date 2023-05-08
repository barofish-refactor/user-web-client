import * as RadixDialog from '@radix-ui/react-dialog';
import { type ReactNode } from 'react';

/* 
  예시입니다. 그대로 갖다쓰지 마세요
*/

interface Props extends RadixDialog.DialogProps {
  triggerChildren?: ReactNode;
}

export default function Dialog({ triggerChildren, children, ...props }: Props) {
  return (
    <RadixDialog.Root {...props}>
      {/* Trigger의 자식 컴포넌트에서 클릭이벤트 발생시 onOpenChange에서 true 발생. asChild가 있으면 하위 컴포넌트를 버튼화, 없으면 자기자신을 버튼화 */}
      {triggerChildren && <RadixDialog.Trigger asChild>{triggerChildren}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='fixed inset-0 z-[100] bg-black opacity-70' />
        <RadixDialog.Content className='fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 bg-white'>
          {/* h2 태그 */}
          <RadixDialog.Title>Title</RadixDialog.Title>
          {/* p 태그 */}
          <RadixDialog.Description>Description</RadixDialog.Description>
          <div>{children}</div>
          {/* Close의 자식 컴포넌트에서 클릭이벤트 발생시 onOpenChange에서 false 발생. asChild가 있으면 하위 컴포넌트를 버튼화, 없으면 자기자신을 버튼화 */}
          <RadixDialog.Close>닫기</RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
