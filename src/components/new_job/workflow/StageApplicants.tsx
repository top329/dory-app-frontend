import { FormInstance, Skeleton } from 'antd';

import { StageAddContent, StageItem, useWorkflow } from '@/components';
import type { WorkflowStageType } from '@/types/workflow';

export default function StageApplicants({ form, loading }: { form: FormInstance<any>; loading: boolean }) {
  const { stageContent, stageModule, selectStageModule, addStageContent } = useWorkflow();

  const handleEditContent = (id: number) => {
    const item = stageContent?.applicantStep?.[id];
    selectStageModule({ applicantStep: { ...item, show: true } });
  };

  return (
    <Skeleton loading={loading} active>
      {stageContent?.applicantStep?.map((rs: WorkflowStageType, key: number) => (
        <div className="mb-4 last:mb-0" key={key}>
          {stageModule?.applicantStep?.show &&
          stageModule?.applicantStep?.id === key &&
          stageModule?.applicantStep?.stageName ? (
            <>
              <StageAddContent form={form} />
            </>
          ) : (
            <>
              <StageItem
                id={key}
                title={rs.stageName as string}
                tagTitle={rs.stageTypeName as string}
                tagColor={rs.stageTypeColor as string}
                onEdit={handleEditContent}
              />
            </>
          )}
        </div>
      ))}
    </Skeleton>
  );
}
