import * as RadixAlert from '@radix-ui/react-alert-dialog';
import { type ReactNode } from 'react';

/* 
  예시입니다. 그대로 갖다쓰지 마세요
*/

interface Props extends RadixAlert.AlertDialogProps {
  triggerChildren?: ReactNode;
}

export default function Alert({ triggerChildren, children, ...props }: Props) {
  return (
    <RadixAlert.Root {...props}>
      {/* Trigger의 자식 컴포넌트에서 클릭이벤트 발생시 onOpenChange에서 true 발생. asChild가 있으면 하위 컴포넌트를 버튼화, 없으면 자기자신을 버튼화 */}
      {triggerChildren && <RadixAlert.Trigger asChild>{triggerChildren}</RadixAlert.Trigger>}
      <RadixAlert.Portal>
        <RadixAlert.Overlay className='fixed inset-0 z-[100] bg-black opacity-70' />
        <RadixAlert.Content className='fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 bg-white'>
          {/* h2 태그 */}
          <RadixAlert.Title>Title</RadixAlert.Title>
          {/* p 태그 */}
          <RadixAlert.Description>Description</RadixAlert.Description>
          <div>{children}</div>
          <RadixAlert.Cancel>닫기</RadixAlert.Cancel>
          <RadixAlert.Action>확인</RadixAlert.Action>
        </RadixAlert.Content>
      </RadixAlert.Portal>
    </RadixAlert.Root>
  );
}
