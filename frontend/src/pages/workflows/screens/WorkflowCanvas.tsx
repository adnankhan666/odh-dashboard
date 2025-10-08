import React from 'react';
import {
  PageSection,
  Title,
  PageSectionVariants,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarGroup,
} from '@patternfly/react-core';
import { PlayIcon, SaveIcon, PlusIcon, UndoIcon } from '@patternfly/react-icons';
import ApplicationsPage from '~/pages/ApplicationsPage';
import WorkflowCanvasEditor from '../components/WorkflowCanvasEditor';

const WorkflowCanvas: React.FC = () => {
  const [workflowName, setWorkflowName] = React.useState('New Workflow');
  const [canvasKey, setCanvasKey] = React.useState(0);

  const handleSave = () => {
    console.log('Saving workflow:', workflowName);
    // TODO: Implement save functionality
  };

  const handleExecute = () => {
    console.log('Executing workflow');
    // TODO: Implement execution functionality
  };

  const handleNewWorkflow = () => {
    setWorkflowName('New Workflow');
    setCanvasKey(prev => prev + 1); // Force re-render of canvas
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      setCanvasKey(prev => prev + 1);
    }
  };

  return (
    <ApplicationsPage
      title=""
      description=""
      loaded
      empty={false}
      provideChildrenPadding={false}
    >
      <PageSection variant={PageSectionVariants.light} className="pf-m-no-padding-on-lg">
        <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
          {/* Header */}
          <FlexItem>
            <Card isFlat>
              <CardBody>
                <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Title headingLevel="h1" size="2xl">
                      🚀 Workflow Canvas
                    </Title>
                  </FlexItem>
                  <FlexItem>
                    <Toolbar>
                      <ToolbarContent>
                        <ToolbarGroup variant="icon-button-group">
                          <ToolbarItem>
                            <Button
                              variant="secondary"
                              icon={<PlusIcon />}
                              onClick={handleNewWorkflow}
                            >
                              New
                            </Button>
                          </ToolbarItem>
                          <ToolbarItem>
                            <Button
                              variant="secondary"
                              icon={<SaveIcon />}
                              onClick={handleSave}
                            >
                              Save
                            </Button>
                          </ToolbarItem>
                          <ToolbarItem>
                            <Button
                              variant="primary"
                              icon={<PlayIcon />}
                              onClick={handleExecute}
                            >
                              Execute
                            </Button>
                          </ToolbarItem>
                          <ToolbarItem>
                            <Button
                              variant="link"
                              icon={<UndoIcon />}
                              onClick={handleClear}
                            >
                              Clear
                            </Button>
                          </ToolbarItem>
                        </ToolbarGroup>
                      </ToolbarContent>
                    </Toolbar>
                  </FlexItem>
                </Flex>
              </CardBody>
            </Card>
          </FlexItem>

          {/* Workflow Canvas */}
          <FlexItem flex={{ default: 'flex_1' }}>
            <WorkflowCanvasEditor 
              key={canvasKey}
              workflowName={workflowName}
              onWorkflowNameChange={setWorkflowName}
              onSave={handleSave}
              onExecute={handleExecute}
            />
          </FlexItem>
        </Flex>
      </PageSection>
    </ApplicationsPage>
  );
};

export default WorkflowCanvas;
