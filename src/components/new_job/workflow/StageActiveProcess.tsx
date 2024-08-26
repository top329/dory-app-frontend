import { FormInstance, Skeleton } from 'antd';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

import { StageAddContent, StageItem, useWorkflow } from '@/components';
import type { WorkflowStageType } from '@/types/workflow';

export default function StageActiveProcess({ form, loading }: { form: FormInstance<any>; loading: boolean }) {
  const { stageContent, stageModule, selectStageModule, addStageContent } = useWorkflow();

  const handleEditContent = (id: number) => {
    const item = stageContent?.activeProcess?.[id];
    selectStageModule({ activeProcess: { ...item, show: true } });
  };

  const handleDeleteContent = (id: number) => {
    const arrData = [...(stageContent?.activeProcess as WorkflowStageType[])];
    arrData.splice(id, 1);

    const filter = arrData.map((rs: WorkflowStageType, key: number) => {
      return {
        ...rs,
        id: key,
      };
    });

    if (filter.length !== 0) {
      form.setFields([{ name: 'activeProcess', errors: undefined, value: '' }]);
    } else {
      form.setFields([{ name: 'activeProcess', errors: ['This is a required'], value: '' }]);
    }

    addStageContent({ ...stageContent, activeProcess: filter });
  };

  const handleOnDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    const items = stageContent?.activeProcess as WorkflowStageType[];
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);

    const reOrder = items.map((rs: WorkflowStageType, key: number) => {
      return {
        ...rs,
        id: key,
      };
    });

    addStageContent({
      activeProcess: reOrder,
      applicantStep: stageContent?.applicantStep,
      hires: stageContent?.hires,
    });
  };

  return (
    <>
      <Skeleton loading={loading} active>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="activeProcess">
            {prov => (
              <div {...prov.droppableProps} ref={prov.innerRef}>
                {stageContent?.activeProcess?.map((rs: WorkflowStageType, key: number) => (
                  <div className="mb-4 last:mb-0" key={key}>
                    {stageModule?.activeProcess?.show &&
                    stageModule?.activeProcess?.id === key &&
                    stageModule?.activeProcess?.stageName ? (
                      <>
                        <StageAddContent form={form} />
                      </>
                    ) : (
                      <>
                        <Draggable
                          key={key}
                          draggableId={key.toString()}
                          index={key}
                          isDragDisabled={stageModule?.activeProcess?.show}
                        >
                          {provided => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <StageItem
                                id={key}
                                isDelete={true}
                                title={rs.stageName as string}
                                tagTitle={rs.stageTypeName as string}
                                tagColor={rs.stageTypeColor as string}
                                onEdit={handleEditContent}
                                onDelete={handleDeleteContent}
                              />
                            </div>
                          )}
                        </Draggable>
                      </>
                    )}
                  </div>
                ))}
                {prov.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Skeleton>

      {stageModule?.activeProcess?.show && !stageModule?.activeProcess?.stageName && <StageAddContent form={form} />}
    </>
  );
}
