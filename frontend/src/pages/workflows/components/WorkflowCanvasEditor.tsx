import React from 'react';
import {
  Card,
  CardBody,
  Flex,
  FlexItem,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelContent,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Title,
  Button,
  Sidebar,
  SidebarPanel,
  SidebarContent,
  FormGroup,
  TextInput,
  TextArea,
  MenuToggle,
  Menu,
  MenuList,
  MenuItem,
  Divider,
  Label,
} from '@patternfly/react-core';
import {
  PlayIcon,
  ConnectedIcon,
  NetworkWiredIcon,
  EditIcon,
  BugIcon,
  CogsIcon,
  BoltIcon,
  ExternalLinkAltIcon,
  CommentsIcon,
  RedoIcon,
} from '@patternfly/react-icons';
import './WorkflowCanvasEditor.scss';

interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  parameters: Record<string, any>;
}

interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
  fromOutput?: string;
  toInput?: string;
}

interface WorkflowCanvasEditorProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onSave: () => void;
  onExecute: () => void;
}

const NODE_TYPES = [
  // Triggers
  {
    type: 'manualTrigger',
    name: 'Manual Trigger',
    icon: <BoltIcon />,
    description: 'Start workflow manually',
    category: 'Triggers',
    color: '#059669',
    defaultParams: { executionData: '{}' }
  },
  
  // AI & Chat Agents
  {
    type: 'openaiChat',
    name: 'OpenAI Chat',
    icon: <CogsIcon />,
    description: 'GPT-3.5/GPT-4 chat completion',
    category: 'AI Agents',
    color: '#10a37f',
    defaultParams: { 
      model: 'gpt-3.5-turbo', 
      apiKey: '', 
      prompt: 'You are a helpful assistant.',
      temperature: '0.7',
      maxTokens: '1000'
    }
  },
  {
    type: 'claudeChat',
    name: 'Claude Chat',
    icon: <CogsIcon />,
    description: 'Anthropic Claude AI assistant',
    category: 'AI Agents',
    color: '#d97706',
    defaultParams: { 
      model: 'claude-3-sonnet-20240229', 
      apiKey: '', 
      prompt: 'You are Claude, a helpful AI assistant.',
      maxTokens: '1000'
    }
  },
  {
    type: 'localLLM',
    name: 'Local LLM',
    icon: <CogsIcon />,
    description: 'Local language model inference',
    category: 'AI Agents',
    color: '#7c2d12',
    defaultParams: { 
      modelPath: '/models/llama2', 
      endpoint: 'http://localhost:11434',
      prompt: '',
      temperature: '0.7'
    }
  },
  
  // Databases
  {
    type: 'postgresql',
    name: 'PostgreSQL',
    icon: <ConnectedIcon />,
    description: 'Connect to PostgreSQL database',
    category: 'Databases',
    color: '#336791',
    defaultParams: { 
      connectionString: 'postgresql://user:pass@localhost:5432/db',
      query: 'SELECT * FROM users;',
      operation: 'select'
    }
  },
  {
    type: 'mongodb',
    name: 'MongoDB',
    icon: <ConnectedIcon />,
    description: 'Connect to MongoDB database',
    category: 'Databases',
    color: '#47a248',
    defaultParams: { 
      connectionString: 'mongodb://localhost:27017/mydb',
      collection: 'users',
      operation: 'find',
      query: '{}'
    }
  },
  {
    type: 'redis',
    name: 'Redis Cache',
    icon: <ConnectedIcon />,
    description: 'Redis caching and data store',
    category: 'Databases',
    color: '#dc382d',
    defaultParams: { 
      host: 'localhost',
      port: '6379',
      operation: 'get',
      key: '',
      value: ''
    }
  },
  {
    type: 'vectorDB',
    name: 'Vector Database',
    icon: <ConnectedIcon />,
    description: 'Store and query vector embeddings',
    category: 'Databases',
    color: '#8b5cf6',
    defaultParams: { 
      provider: 'pinecone',
      indexName: 'my-index',
      operation: 'query',
      vector: '',
      topK: '10'
    }
  },
  
  // Security & Authentication
  {
    type: 'jwtValidator',
    name: 'JWT Validator',
    icon: <CogsIcon />,
    description: 'Validate JWT tokens',
    category: 'Security',
    color: '#dc2626',
    defaultParams: { 
      secret: '',
      algorithm: 'HS256',
      tokenField: 'token',
      issuer: '',
      audience: ''
    }
  },
  {
    type: 'oauth2',
    name: 'OAuth2 Auth',
    icon: <CogsIcon />,
    description: 'OAuth2 authentication flow',
    category: 'Security',
    color: '#059669',
    defaultParams: { 
      provider: 'google',
      clientId: '',
      clientSecret: '',
      scopes: 'openid profile email',
      redirectUri: ''
    }
  },
  {
    type: 'apiKeyAuth',
    name: 'API Key Auth',
    icon: <CogsIcon />,
    description: 'API key authentication',
    category: 'Security',
    color: '#7c2d12',
    defaultParams: { 
      headerName: 'X-API-Key',
      apiKey: '',
      validation: 'required'
    }
  },
  {
    type: 'encryptDecrypt',
    name: 'Encrypt/Decrypt',
    icon: <CogsIcon />,
    description: 'Encrypt or decrypt data',
    category: 'Security',
    color: '#991b1b',
    defaultParams: { 
      operation: 'encrypt',
      algorithm: 'AES-256-GCM',
      key: '',
      data: ''
    }
  },
  
  // Cloud Services
  {
    type: 'awsS3',
    name: 'AWS S3',
    icon: <NetworkWiredIcon />,
    description: 'AWS S3 storage operations',
    category: 'Cloud',
    color: '#ff9900',
    defaultParams: { 
      operation: 'get',
      bucket: '',
      key: '',
      region: 'us-east-1',
      accessKeyId: '',
      secretAccessKey: ''
    }
  },
  {
    type: 'azureBlob',
    name: 'Azure Blob',
    icon: <NetworkWiredIcon />,
    description: 'Azure Blob storage operations',
    category: 'Cloud',
    color: '#0078d4',
    defaultParams: { 
      operation: 'upload',
      containerName: '',
      blobName: '',
      connectionString: ''
    }
  },
  {
    type: 'gcpStorage',
    name: 'GCP Storage',
    icon: <NetworkWiredIcon />,
    description: 'Google Cloud Storage operations',
    category: 'Cloud',
    color: '#4285f4',
    defaultParams: { 
      operation: 'download',
      bucketName: '',
      fileName: '',
      projectId: '',
      keyFile: ''
    }
  },
  
  // ML & AI Operations
  {
    type: 'textEmbedding',
    name: 'Text Embedding',
    icon: <CogsIcon />,
    description: 'Generate text embeddings',
    category: 'ML/AI',
    color: '#8b5cf6',
    defaultParams: { 
      provider: 'openai',
      model: 'text-embedding-ada-002',
      text: '',
      apiKey: ''
    }
  },
  {
    type: 'imageGeneration',
    name: 'Image Generation',
    icon: <CogsIcon />,
    description: 'Generate images with AI',
    category: 'ML/AI',
    color: '#ec4899',
    defaultParams: { 
      provider: 'dalle',
      prompt: '',
      size: '1024x1024',
      quality: 'standard',
      apiKey: ''
    }
  },
  {
    type: 'modelInference',
    name: 'Model Inference',
    icon: <CogsIcon />,
    description: 'Run ML model inference',
    category: 'ML/AI',
    color: '#6366f1',
    defaultParams: { 
      modelEndpoint: '',
      inputData: '',
      modelType: 'classification',
      threshold: '0.5'
    }
  },
  
  // Communication
  {
    type: 'slack',
    name: 'Slack Message',
    icon: <NetworkWiredIcon />,
    description: 'Send messages to Slack',
    category: 'Communication',
    color: '#4a154b',
    defaultParams: { 
      webhook: '',
      channel: '#general',
      message: '',
      username: 'Workflow Bot'
    }
  },
  {
    type: 'email',
    name: 'Email',
    icon: <NetworkWiredIcon />,
    description: 'Send email notifications',
    category: 'Communication',
    color: '#dc2626',
    defaultParams: { 
      smtp: 'smtp.gmail.com:587',
      from: '',
      to: '',
      subject: '',
      body: '',
      auth: ''
    }
  },
  {
    type: 'webhook',
    name: 'Webhook',
    icon: <NetworkWiredIcon />,
    description: 'Send webhook notifications',
    category: 'Communication',
    color: '#059669',
    defaultParams: { 
      url: '',
      method: 'POST',
      headers: '{}',
      payload: '{}'
    }
  },
  
  // ODH Workbench Components
  {
    type: 'jupyterNotebook',
    name: 'Jupyter Notebook',
    icon: <CogsIcon />,
    description: 'Launch Jupyter notebook server',
    category: 'ODH Workbenches',
    color: '#f37626',
    defaultParams: { 
      notebookImage: 'jupyter-scipy-notebook',
      containerSize: 'Small',
      environmentVars: '{}',
      pvcSize: '20Gi'
    }
  },
  {
    type: 'anacondaCE',
    name: 'Anaconda CE',
    icon: <CogsIcon />,
    description: 'Anaconda Community Edition workbench',
    category: 'ODH Workbenches',
    color: '#44a047',
    defaultParams: { 
      condaEnvironment: 'base',
      packages: 'numpy pandas matplotlib',
      pythonVersion: '3.11'
    }
  },
  {
    type: 'openvinoNotebook',
    name: 'OpenVINO Toolkit',
    icon: <CogsIcon />,
    description: 'Intel OpenVINO inference workbench',
    category: 'ODH Workbenches',
    color: '#0071c5',
    defaultParams: { 
      modelPath: '/models/openvino_model',
      device: 'CPU',
      optimizationLevel: 'PERFORMANCE'
    }
  },
  {
    type: 'watsonX',
    name: 'Watson X',
    icon: <CogsIcon />,
    description: 'IBM Watson X AI workbench',
    category: 'ODH Workbenches',
    color: '#1261fe',
    defaultParams: { 
      projectId: '',
      apiKey: '',
      region: 'us-south'
    }
  },
  
  // ODH Data Science Pipelines
  {
    type: 'dsPipelineRun',
    name: 'Pipeline Run',
    icon: <PlayIcon />,
    description: 'Execute data science pipeline',
    category: 'ODH Pipelines',
    color: '#0066cc',
    defaultParams: { 
      pipelineId: '',
      parameters: '{}',
      namespace: 'default'
    }
  },
  {
    type: 'pipelineUpload',
    name: 'Pipeline Upload',
    icon: <CogsIcon />,
    description: 'Upload pipeline YAML/ZIP',
    category: 'ODH Pipelines',
    color: '#004080',
    defaultParams: { 
      filePath: '',
      pipelineName: '',
      description: ''
    }
  },
  {
    type: 'mlmdArtifact',
    name: 'MLMD Artifact',
    icon: <ConnectedIcon />,
    description: 'ML Metadata artifact tracking',
    category: 'ODH Pipelines',
    color: '#5856d6',
    defaultParams: { 
      artifactName: '',
      artifactType: 'Dataset',
      uri: '',
      properties: '{}'
    }
  },
  
  // ODH Model Serving
  {
    type: 'kserveModel',
    name: 'KServe Model',
    icon: <NetworkWiredIcon />,
    description: 'Deploy model with KServe',
    category: 'ODH Model Serving',
    color: '#326ce5',
    defaultParams: { 
      modelName: '',
      storageUri: '',
      framework: 'sklearn',
      runtime: 'kserve-sklearnserver'
    }
  },
  {
    type: 'modelMeshServing',
    name: 'ModelMesh Serving',
    icon: <NetworkWiredIcon />,
    description: 'Multi-model serving with ModelMesh',
    category: 'ODH Model Serving',
    color: '#0f4c3a',
    defaultParams: { 
      modelId: '',
      modelType: 'sklearn',
      storageConnection: '',
      storagePath: ''
    }
  },
  {
    type: 'modelRegistry',
    name: 'Model Registry',
    icon: <ConnectedIcon />,
    description: 'Register and manage ML models',
    category: 'ODH Model Serving',
    color: '#8b5cf6',
    defaultParams: { 
      registryName: 'default',
      modelName: '',
      version: '1.0.0',
      description: ''
    }
  },
  
  // ODH Distributed Computing
  {
    type: 'rayCluster',
    name: 'Ray Cluster',
    icon: <CogsIcon />,
    description: 'Distributed computing with Ray',
    category: 'ODH Distributed',
    color: '#028cf0',
    defaultParams: { 
      headNodeType: 'cpu-small',
      workerNodes: '2',
      rayVersion: '2.5.0',
      pythonVersion: '3.9'
    }
  },
  {
    type: 'codeflareJob',
    name: 'CodeFlare Job',
    icon: <BoltIcon />,
    description: 'Distributed ML training with CodeFlare',
    category: 'ODH Distributed',
    color: '#ee0000',
    defaultParams: { 
      jobName: '',
      image: 'ray:latest',
      workers: '4',
      cpu: '1',
      memory: '2Gi'
    }
  },
  {
    type: 'kueDW',
    name: 'Distributed Workload',
    icon: <CogsIcon />,
    description: 'Kueue distributed workload management',
    category: 'ODH Distributed',
    color: '#673ab7',
    defaultParams: { 
      queueName: 'default-queue',
      priority: 'normal',
      resources: '{"cpu": "1", "memory": "2Gi"}'
    }
  },
  
  // ODH AI/ML Tools
  {
    type: 'trustyAI',
    name: 'TrustyAI Service',
    icon: <CogsIcon />,
    description: 'AI fairness and explainability',
    category: 'ODH AI Tools',
    color: '#ff6b35',
    defaultParams: { 
      serviceUrl: '',
      inferenceService: '',
      metricsType: 'bias',
      threshold: '0.8'
    }
  },
  {
    type: 'acceleratorProfile',
    name: 'Accelerator Profile',
    icon: <BoltIcon />,
    description: 'GPU/TPU accelerator configuration',
    category: 'ODH AI Tools',
    color: '#76b900',
    defaultParams: { 
      acceleratorType: 'nvidia-gpu',
      count: '1',
      tolerations: '{}',
      nodeSelector: '{}'
    }
  },
  {
    type: 'notebookImage',
    name: 'Custom Notebook Image',
    icon: <CogsIcon />,
    description: 'Custom notebook container image',
    category: 'ODH AI Tools',
    color: '#2e7d32',
    defaultParams: { 
      imageUrl: '',
      displayName: '',
      description: '',
      packages: 'tensorflow pytorch'
    }
  },
  
  // ODH Data Tools
  {
    type: 'pachydermRepo',
    name: 'Pachyderm Repository',
    icon: <ConnectedIcon />,
    description: 'Pachyderm data versioning',
    category: 'ODH Data Tools',
    color: '#f9ab00',
    defaultParams: { 
      repoName: '',
      branch: 'master',
      operation: 'put-file',
      filePath: ''
    }
  },
  {
    type: 'starburstQuery',
    name: 'Starburst Query',
    icon: <CogsIcon />,
    description: 'Starburst Trino SQL analytics',
    category: 'ODH Data Tools',
    color: '#dd246e',
    defaultParams: { 
      catalog: '',
      schema: '',
      query: 'SELECT * FROM table',
      outputFormat: 'json'
    }
  },
  {
    type: 'dataConnection',
    name: 'Data Connection',
    icon: <ConnectedIcon />,
    description: 'ODH data source connection',
    category: 'ODH Data Tools',
    color: '#0f62fe',
    defaultParams: { 
      connectionType: 's3',
      endpoint: '',
      bucket: '',
      accessKey: '',
      secretKey: ''
    }
  },
  
  // Basic Operations
  {
    type: 'httpRequest',
    name: 'HTTP Request',
    icon: <NetworkWiredIcon />,
    description: 'Make API calls',
    category: 'Actions',
    color: '#2563eb',
    defaultParams: { method: 'GET', url: '', headers: '{}', body: '' }
  },
  {
    type: 'setVariable',
    name: 'Set Variable',
    icon: <CogsIcon />,
    description: 'Set data variables',
    category: 'Data',
    color: '#dc2626',
    defaultParams: { variableName: '', variableValue: '', operation: 'set' }
  },
  {
    type: 'conditional',
    name: 'Conditional',
    icon: <ConnectedIcon />,
    description: 'Branch based on conditions',
    category: 'Logic',
    color: '#7c3aed',
    defaultParams: { fieldName: '', operation: 'equal', compareValue: '' }
  },
  {
    type: 'debug',
    name: 'Debug',
    icon: <BugIcon />,
    description: 'Debug output',
    category: 'Utility',
    color: '#ea580c',
    defaultParams: { message: 'Debug output', logLevel: 'info' }
  },
];

const WorkflowCanvasEditor: React.FC<WorkflowCanvasEditorProps> = ({
  workflowName,
  onWorkflowNameChange,
  onSave,
  onExecute,
}) => {
  const [nodes, setNodes] = React.useState<WorkflowNode[]>([]);
  const [connections, setConnections] = React.useState<WorkflowConnection[]>([]);
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [nodeIdCounter, setNodeIdCounter] = React.useState(1);
  const [connectionIdCounter, setConnectionIdCounter] = React.useState(1);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [connectionStart, setConnectionStart] = React.useState<{nodeId: string, type: string} | null>(null);

  const canvasRef = React.useRef<HTMLDivElement>(null);

  // Create a new node
  const createNode = (type: string, x: number, y: number) => {
    const nodeType = NODE_TYPES.find(nt => nt.type === type);
    if (!nodeType) return;

    const newNode: WorkflowNode = {
      id: `node-${nodeIdCounter}`,
      type,
      name: nodeType.name,
      position: { x, y },
      parameters: { ...nodeType.defaultParams },
    };

    setNodes(prev => [...prev, newNode]);
    setNodeIdCounter(prev => prev + 1);
    setSelectedNode(newNode.id);
    setIsPropertiesOpen(true);
  };

  // Handle node selection
  const selectNode = (nodeId: string) => {
    setSelectedNode(nodeId);
    setIsPropertiesOpen(true);
  };

  // Handle node drag
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedNode(nodeId);

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = moveEvent.clientX - canvasRect.left - dragOffset.x;
      const newY = moveEvent.clientY - canvasRect.top - dragOffset.y;

      setNodes(prev =>
        prev.map(node =>
          node.id === nodeId
            ? { ...node, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
            : node
        )
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle canvas drop
  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('text/plain');
    if (!nodeType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createNode(nodeType, x, y);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Update node parameters
  const updateNodeParameter = (nodeId: string, paramName: string, value: any) => {
    setNodes(prev =>
      prev.map(node =>
        node.id === nodeId
          ? { ...node, parameters: { ...node.parameters, [paramName]: value } }
          : node
      )
    );
  };

  // Connection handling
  const startConnection = (nodeId: string, type: 'input' | 'output') => {
    setIsConnecting(true);
    setConnectionStart({ nodeId, type });
  };

  const finishConnection = (nodeId: string, type: 'input' | 'output') => {
    if (!isConnecting || !connectionStart) return;

    // Can't connect to same node or same type
    if (connectionStart.nodeId === nodeId || connectionStart.type === type) {
      cancelConnection();
      return;
    }

    const connectionId = `conn-${connectionIdCounter}`;
    let fromNode, toNode;

    if (connectionStart.type === 'output') {
      fromNode = connectionStart.nodeId;
      toNode = nodeId;
    } else {
      fromNode = nodeId;
      toNode = connectionStart.nodeId;
    }

    // Check if connection already exists
    const existingConnection = connections.find(
      conn => conn.from === fromNode && conn.to === toNode
    );

    if (!existingConnection) {
      const newConnection: WorkflowConnection = {
        id: connectionId,
        from: fromNode,
        to: toNode,
      };

      setConnections(prev => [...prev, newConnection]);
      setConnectionIdCounter(prev => prev + 1);
    }

    cancelConnection();
  };

  const cancelConnection = () => {
    setIsConnecting(false);
    setConnectionStart(null);
  };

  // Delete connection
  const deleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  // Node actions
  const handleNodeAction = (nodeId: string, action: 'launch' | 'chat' | 'reload') => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    switch (action) {
      case 'launch':
        console.log(`Launching ${node.name} (${node.type})`);
        // TODO: Implement actual launch functionality
        alert(`🚀 Launching ${node.name}!\n\nThis would execute the ${node.type} node with its configured parameters.`);
        break;
      case 'chat':
        console.log(`Opening chat for ${node.name}`);
        // TODO: Implement chat functionality
        alert(`💬 Chat with ${node.name}!\n\nThis would open a chat interface to configure the node interactively.`);
        break;
      case 'reload':
        console.log(`Reloading ${node.name}`);
        // TODO: Implement reload functionality
        alert(`🔄 Reloading ${node.name}!\n\nThis would refresh the node's status and configuration.`);
        break;
    }
  };

  // Delete node
  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => conn.from !== nodeId && conn.to !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
      setIsPropertiesOpen(false);
    }
  };

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;
  const selectedNodeType = selectedNodeData ? NODE_TYPES.find(nt => nt.type === selectedNodeData.type) : null;

  // Node palette component
  const NodePalette = (
    <SidebarPanel width={{ default: 'width_25' }}>
      <Card isFullHeight>
        <CardBody>
          <Title headingLevel="h3" size="md" className="pf-u-mb-md">
            Node Types
          </Title>
          
          {['Triggers', 'ODH Workbenches', 'ODH Pipelines', 'ODH Model Serving', 'ODH Distributed', 'ODH AI Tools', 'ODH Data Tools', 'AI Agents', 'Databases', 'Security', 'Cloud', 'ML/AI', 'Communication', 'Actions', 'Data', 'Logic', 'Utility'].map(category => {
            const categoryNodes = NODE_TYPES.filter(nt => nt.category === category);
            if (categoryNodes.length === 0) return null;

            return (
              <div key={category} className="pf-u-mb-lg">
                <Title headingLevel="h4" size="sm" className="pf-u-mb-sm">
                  {category}
                </Title>
                {categoryNodes.map(nodeType => (
                  <div
                    key={nodeType.type}
                    className="workflow-node-palette-item"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', nodeType.type);
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                  >
                    <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                      <FlexItem>
                        <div 
                          className="workflow-node-icon"
                          style={{ backgroundColor: nodeType.color }}
                        >
                          {nodeType.icon}
                        </div>
                      </FlexItem>
                      <FlexItem>
                        <div>
                          <div className="workflow-node-title">{nodeType.name}</div>
                          <div className="workflow-node-description">{nodeType.description}</div>
                        </div>
                      </FlexItem>
                    </Flex>
                  </div>
                ))}
              </div>
            );
          })}
        </CardBody>
      </Card>
    </SidebarPanel>
  );

  // Properties panel
  const PropertiesPanel = (
    <DrawerPanelContent widths={{ default: 'width_33' }}>
      <DrawerHead>
        <Title headingLevel="h3" size="md">
          {selectedNodeData ? `${selectedNodeData.name} Properties` : 'Properties'}
        </Title>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setIsPropertiesOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerContentBody>
        {selectedNodeData && selectedNodeType ? (
          <div className="workflow-properties-form">
            <FormGroup label="Node Name" fieldId="node-name">
              <TextInput
                id="node-name"
                value={selectedNodeData.name}
                onChange={(_event, value) => {
                  setNodes(prev =>
                    prev.map(node =>
                      node.id === selectedNode ? { ...node, name: value } : node
                    )
                  );
                }}
              />
            </FormGroup>

            <Divider className="pf-u-my-md" />

            {/* Dynamic parameter fields based on node type */}
            {selectedNodeType.type === 'manualTrigger' && (
              <FormGroup label="Execution Data" fieldId="execution-data">
                <TextArea
                  id="execution-data"
                  value={selectedNodeData.parameters.executionData || '{}'}
                  onChange={(_event, value) => updateNodeParameter(selectedNode!, 'executionData', value)}
                  rows={4}
                  placeholder="Enter JSON data"
                />
              </FormGroup>
            )}

            {selectedNodeType.type === 'httpRequest' && (
              <>
                <FormGroup label="Method" fieldId="http-method">
                  <TextInput
                    id="http-method"
                    value={selectedNodeData.parameters.method || 'GET'}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'method', value)}
                    placeholder="GET, POST, PUT, DELETE"
                  />
                </FormGroup>
                
                <FormGroup label="URL" fieldId="http-url">
                  <TextInput
                    id="http-url"
                    value={selectedNodeData.parameters.url || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'url', value)}
                    placeholder="https://api.example.com/data"
                  />
                </FormGroup>

                <FormGroup label="Headers" fieldId="http-headers">
                  <TextArea
                    id="http-headers"
                    value={selectedNodeData.parameters.headers || '{}'}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'headers', value)}
                    rows={3}
                    placeholder='{"Authorization": "Bearer token"}'
                  />
                </FormGroup>

                <FormGroup label="Body" fieldId="http-body">
                  <TextArea
                    id="http-body"
                    value={selectedNodeData.parameters.body || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'body', value)}
                    rows={4}
                    placeholder="Request body (for POST/PUT)"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'setVariable' && (
              <>
                <FormGroup label="Variable Name" fieldId="var-name">
                  <TextInput
                    id="var-name"
                    value={selectedNodeData.parameters.variableName || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'variableName', value)}
                    placeholder="myVariable"
                  />
                </FormGroup>
                
                <FormGroup label="Variable Value" fieldId="var-value">
                  <TextInput
                    id="var-value"
                    value={selectedNodeData.parameters.variableValue || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'variableValue', value)}
                    placeholder="Enter value or JSON"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'conditional' && (
              <>
                <FormGroup label="Field Name" fieldId="cond-field">
                  <TextInput
                    id="cond-field"
                    value={selectedNodeData.parameters.fieldName || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'fieldName', value)}
                    placeholder="statusCode"
                  />
                </FormGroup>
                
                <FormGroup label="Compare Value" fieldId="cond-value">
                  <TextInput
                    id="cond-value"
                    value={selectedNodeData.parameters.compareValue || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'compareValue', value)}
                    placeholder="200"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'debug' && (
              <>
                <FormGroup label="Message" fieldId="debug-message">
                  <TextInput
                    id="debug-message"
                    value={selectedNodeData.parameters.message || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'message', value)}
                    placeholder="Debug message"
                  />
                </FormGroup>
              </>
            )}

            {/* AI Agents Parameters */}
            {selectedNodeType.type === 'openaiChat' && (
              <>
                <FormGroup label="API Key" fieldId="openai-key">
                  <TextInput
                    id="openai-key"
                    type="password"
                    value={selectedNodeData.parameters.apiKey || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'apiKey', value)}
                    placeholder="sk-..."
                  />
                </FormGroup>
                <FormGroup label="Model" fieldId="openai-model">
                  <TextInput
                    id="openai-model"
                    value={selectedNodeData.parameters.model || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'model', value)}
                    placeholder="gpt-3.5-turbo"
                  />
                </FormGroup>
                <FormGroup label="Prompt" fieldId="openai-prompt">
                  <TextArea
                    id="openai-prompt"
                    value={selectedNodeData.parameters.prompt || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'prompt', value)}
                    rows={4}
                    placeholder="Enter your prompt..."
                  />
                </FormGroup>
                <FormGroup label="Temperature" fieldId="openai-temp">
                  <TextInput
                    id="openai-temp"
                    value={selectedNodeData.parameters.temperature || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'temperature', value)}
                    placeholder="0.7"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'claudeChat' && (
              <>
                <FormGroup label="API Key" fieldId="claude-key">
                  <TextInput
                    id="claude-key"
                    type="password"
                    value={selectedNodeData.parameters.apiKey || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'apiKey', value)}
                    placeholder="sk-ant-..."
                  />
                </FormGroup>
                <FormGroup label="Model" fieldId="claude-model">
                  <TextInput
                    id="claude-model"
                    value={selectedNodeData.parameters.model || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'model', value)}
                    placeholder="claude-3-sonnet-20240229"
                  />
                </FormGroup>
                <FormGroup label="Prompt" fieldId="claude-prompt">
                  <TextArea
                    id="claude-prompt"
                    value={selectedNodeData.parameters.prompt || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'prompt', value)}
                    rows={4}
                    placeholder="Enter your prompt..."
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'localLLM' && (
              <>
                <FormGroup label="Endpoint" fieldId="llm-endpoint">
                  <TextInput
                    id="llm-endpoint"
                    value={selectedNodeData.parameters.endpoint || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'endpoint', value)}
                    placeholder="http://localhost:11434"
                  />
                </FormGroup>
                <FormGroup label="Model Path" fieldId="llm-path">
                  <TextInput
                    id="llm-path"
                    value={selectedNodeData.parameters.modelPath || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'modelPath', value)}
                    placeholder="/models/llama2"
                  />
                </FormGroup>
                <FormGroup label="Prompt" fieldId="llm-prompt">
                  <TextArea
                    id="llm-prompt"
                    value={selectedNodeData.parameters.prompt || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'prompt', value)}
                    rows={4}
                    placeholder="Enter your prompt..."
                  />
                </FormGroup>
              </>
            )}

            {/* Database Parameters */}
            {selectedNodeType.type === 'postgresql' && (
              <>
                <FormGroup label="Connection String" fieldId="pg-conn">
                  <TextInput
                    id="pg-conn"
                    type="password"
                    value={selectedNodeData.parameters.connectionString || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'connectionString', value)}
                    placeholder="postgresql://user:pass@localhost:5432/db"
                  />
                </FormGroup>
                <FormGroup label="SQL Query" fieldId="pg-query">
                  <TextArea
                    id="pg-query"
                    value={selectedNodeData.parameters.query || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'query', value)}
                    rows={3}
                    placeholder="SELECT * FROM users WHERE active = true;"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'mongodb' && (
              <>
                <FormGroup label="Connection String" fieldId="mongo-conn">
                  <TextInput
                    id="mongo-conn"
                    type="password"
                    value={selectedNodeData.parameters.connectionString || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'connectionString', value)}
                    placeholder="mongodb://localhost:27017/mydb"
                  />
                </FormGroup>
                <FormGroup label="Collection" fieldId="mongo-collection">
                  <TextInput
                    id="mongo-collection"
                    value={selectedNodeData.parameters.collection || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'collection', value)}
                    placeholder="users"
                  />
                </FormGroup>
                <FormGroup label="Query" fieldId="mongo-query">
                  <TextArea
                    id="mongo-query"
                    value={selectedNodeData.parameters.query || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'query', value)}
                    rows={3}
                    placeholder='{"status": "active"}'
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'redis' && (
              <>
                <FormGroup label="Host" fieldId="redis-host">
                  <TextInput
                    id="redis-host"
                    value={selectedNodeData.parameters.host || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'host', value)}
                    placeholder="localhost"
                  />
                </FormGroup>
                <FormGroup label="Port" fieldId="redis-port">
                  <TextInput
                    id="redis-port"
                    value={selectedNodeData.parameters.port || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'port', value)}
                    placeholder="6379"
                  />
                </FormGroup>
                <FormGroup label="Operation" fieldId="redis-op">
                  <TextInput
                    id="redis-op"
                    value={selectedNodeData.parameters.operation || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'operation', value)}
                    placeholder="get, set, delete"
                  />
                </FormGroup>
                <FormGroup label="Key" fieldId="redis-key">
                  <TextInput
                    id="redis-key"
                    value={selectedNodeData.parameters.key || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'key', value)}
                    placeholder="mykey"
                  />
                </FormGroup>
              </>
            )}

            {/* Security Parameters */}
            {selectedNodeType.type === 'jwtValidator' && (
              <>
                <FormGroup label="Secret Key" fieldId="jwt-secret">
                  <TextInput
                    id="jwt-secret"
                    type="password"
                    value={selectedNodeData.parameters.secret || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'secret', value)}
                    placeholder="your-secret-key"
                  />
                </FormGroup>
                <FormGroup label="Algorithm" fieldId="jwt-algorithm">
                  <TextInput
                    id="jwt-algorithm"
                    value={selectedNodeData.parameters.algorithm || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'algorithm', value)}
                    placeholder="HS256"
                  />
                </FormGroup>
                <FormGroup label="Issuer" fieldId="jwt-issuer">
                  <TextInput
                    id="jwt-issuer"
                    value={selectedNodeData.parameters.issuer || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'issuer', value)}
                    placeholder="your-app"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'oauth2' && (
              <>
                <FormGroup label="Provider" fieldId="oauth-provider">
                  <TextInput
                    id="oauth-provider"
                    value={selectedNodeData.parameters.provider || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'provider', value)}
                    placeholder="google, github, microsoft"
                  />
                </FormGroup>
                <FormGroup label="Client ID" fieldId="oauth-client">
                  <TextInput
                    id="oauth-client"
                    value={selectedNodeData.parameters.clientId || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'clientId', value)}
                    placeholder="your-client-id"
                  />
                </FormGroup>
                <FormGroup label="Client Secret" fieldId="oauth-secret">
                  <TextInput
                    id="oauth-secret"
                    type="password"
                    value={selectedNodeData.parameters.clientSecret || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'clientSecret', value)}
                    placeholder="your-client-secret"
                  />
                </FormGroup>
                <FormGroup label="Scopes" fieldId="oauth-scopes">
                  <TextInput
                    id="oauth-scopes"
                    value={selectedNodeData.parameters.scopes || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'scopes', value)}
                    placeholder="openid profile email"
                  />
                </FormGroup>
              </>
            )}

            {/* Cloud Service Parameters */}
            {selectedNodeType.type === 'awsS3' && (
              <>
                <FormGroup label="Operation" fieldId="s3-operation">
                  <TextInput
                    id="s3-operation"
                    value={selectedNodeData.parameters.operation || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'operation', value)}
                    placeholder="get, put, delete, list"
                  />
                </FormGroup>
                <FormGroup label="Bucket" fieldId="s3-bucket">
                  <TextInput
                    id="s3-bucket"
                    value={selectedNodeData.parameters.bucket || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'bucket', value)}
                    placeholder="my-bucket"
                  />
                </FormGroup>
                <FormGroup label="Key" fieldId="s3-key">
                  <TextInput
                    id="s3-key"
                    value={selectedNodeData.parameters.key || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'key', value)}
                    placeholder="path/to/file.txt"
                  />
                </FormGroup>
                <FormGroup label="AWS Access Key" fieldId="s3-access">
                  <TextInput
                    id="s3-access"
                    type="password"
                    value={selectedNodeData.parameters.accessKeyId || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'accessKeyId', value)}
                    placeholder="AKIA..."
                  />
                </FormGroup>
              </>
            )}

            {/* Communication Parameters */}
            {selectedNodeType.type === 'slack' && (
              <>
                <FormGroup label="Webhook URL" fieldId="slack-webhook">
                  <TextInput
                    id="slack-webhook"
                    type="password"
                    value={selectedNodeData.parameters.webhook || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'webhook', value)}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </FormGroup>
                <FormGroup label="Channel" fieldId="slack-channel">
                  <TextInput
                    id="slack-channel"
                    value={selectedNodeData.parameters.channel || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'channel', value)}
                    placeholder="#general"
                  />
                </FormGroup>
                <FormGroup label="Message" fieldId="slack-message">
                  <TextArea
                    id="slack-message"
                    value={selectedNodeData.parameters.message || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'message', value)}
                    rows={3}
                    placeholder="Your message here..."
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'email' && (
              <>
                <FormGroup label="SMTP Server" fieldId="email-smtp">
                  <TextInput
                    id="email-smtp"
                    value={selectedNodeData.parameters.smtp || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'smtp', value)}
                    placeholder="smtp.gmail.com:587"
                  />
                </FormGroup>
                <FormGroup label="From" fieldId="email-from">
                  <TextInput
                    id="email-from"
                    value={selectedNodeData.parameters.from || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'from', value)}
                    placeholder="sender@example.com"
                  />
                </FormGroup>
                <FormGroup label="To" fieldId="email-to">
                  <TextInput
                    id="email-to"
                    value={selectedNodeData.parameters.to || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'to', value)}
                    placeholder="recipient@example.com"
                  />
                </FormGroup>
                <FormGroup label="Subject" fieldId="email-subject">
                  <TextInput
                    id="email-subject"
                    value={selectedNodeData.parameters.subject || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'subject', value)}
                    placeholder="Email subject"
                  />
                </FormGroup>
                <FormGroup label="Body" fieldId="email-body">
                  <TextArea
                    id="email-body"
                    value={selectedNodeData.parameters.body || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'body', value)}
                    rows={4}
                    placeholder="Email content..."
                  />
                </FormGroup>
              </>
            )}

            {/* ML/AI Parameters */}
            {selectedNodeType.type === 'textEmbedding' && (
              <>
                <FormGroup label="Provider" fieldId="embedding-provider">
                  <TextInput
                    id="embedding-provider"
                    value={selectedNodeData.parameters.provider || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'provider', value)}
                    placeholder="openai, huggingface, cohere"
                  />
                </FormGroup>
                <FormGroup label="Model" fieldId="embedding-model">
                  <TextInput
                    id="embedding-model"
                    value={selectedNodeData.parameters.model || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'model', value)}
                    placeholder="text-embedding-ada-002"
                  />
                </FormGroup>
                <FormGroup label="Text" fieldId="embedding-text">
                  <TextArea
                    id="embedding-text"
                    value={selectedNodeData.parameters.text || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'text', value)}
                    rows={3}
                    placeholder="Text to embed..."
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'vectorDB' && (
              <>
                <FormGroup label="Provider" fieldId="vector-provider">
                  <TextInput
                    id="vector-provider"
                    value={selectedNodeData.parameters.provider || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'provider', value)}
                    placeholder="pinecone, weaviate, qdrant"
                  />
                </FormGroup>
                <FormGroup label="Index Name" fieldId="vector-index">
                  <TextInput
                    id="vector-index"
                    value={selectedNodeData.parameters.indexName || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'indexName', value)}
                    placeholder="my-index"
                  />
                </FormGroup>
                <FormGroup label="Operation" fieldId="vector-op">
                  <TextInput
                    id="vector-op"
                    value={selectedNodeData.parameters.operation || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'operation', value)}
                    placeholder="query, upsert, delete"
                  />
                </FormGroup>
                <FormGroup label="Top K Results" fieldId="vector-topk">
                  <TextInput
                    id="vector-topk"
                    value={selectedNodeData.parameters.topK || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'topK', value)}
                    placeholder="10"
                  />
                </FormGroup>
              </>
            )}

            {/* ODH Workbench Parameters */}
            {selectedNodeType.type === 'jupyterNotebook' && (
              <>
                <FormGroup label="Notebook Image" fieldId="jupyter-image">
                  <TextInput
                    id="jupyter-image"
                    value={selectedNodeData.parameters.notebookImage || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'notebookImage', value)}
                    placeholder="jupyter-scipy-notebook, jupyter-pytorch-notebook"
                  />
                </FormGroup>
                <FormGroup label="Container Size" fieldId="jupyter-size">
                  <TextInput
                    id="jupyter-size"
                    value={selectedNodeData.parameters.containerSize || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'containerSize', value)}
                    placeholder="Small, Medium, Large"
                  />
                </FormGroup>
                <FormGroup label="Environment Variables" fieldId="jupyter-env">
                  <TextArea
                    id="jupyter-env"
                    value={selectedNodeData.parameters.environmentVars || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'environmentVars', value)}
                    rows={3}
                    placeholder='{"AWS_ACCESS_KEY_ID": "key", "AWS_SECRET_ACCESS_KEY": "secret"}'
                  />
                </FormGroup>
                <FormGroup label="PVC Size" fieldId="jupyter-pvc">
                  <TextInput
                    id="jupyter-pvc"
                    value={selectedNodeData.parameters.pvcSize || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'pvcSize', value)}
                    placeholder="20Gi"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'kserveModel' && (
              <>
                <FormGroup label="Model Name" fieldId="kserve-name">
                  <TextInput
                    id="kserve-name"
                    value={selectedNodeData.parameters.modelName || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'modelName', value)}
                    placeholder="my-sklearn-model"
                  />
                </FormGroup>
                <FormGroup label="Storage URI" fieldId="kserve-uri">
                  <TextInput
                    id="kserve-uri"
                    value={selectedNodeData.parameters.storageUri || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'storageUri', value)}
                    placeholder="s3://bucket/model/"
                  />
                </FormGroup>
                <FormGroup label="Framework" fieldId="kserve-framework">
                  <TextInput
                    id="kserve-framework"
                    value={selectedNodeData.parameters.framework || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'framework', value)}
                    placeholder="sklearn, pytorch, tensorflow"
                  />
                </FormGroup>
                <FormGroup label="Runtime" fieldId="kserve-runtime">
                  <TextInput
                    id="kserve-runtime"
                    value={selectedNodeData.parameters.runtime || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'runtime', value)}
                    placeholder="kserve-sklearnserver"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'dsPipelineRun' && (
              <>
                <FormGroup label="Pipeline ID" fieldId="pipeline-id">
                  <TextInput
                    id="pipeline-id"
                    value={selectedNodeData.parameters.pipelineId || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'pipelineId', value)}
                    placeholder="pipeline-uuid"
                  />
                </FormGroup>
                <FormGroup label="Parameters" fieldId="pipeline-params">
                  <TextArea
                    id="pipeline-params"
                    value={selectedNodeData.parameters.parameters || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'parameters', value)}
                    rows={4}
                    placeholder='{"learning_rate": 0.01, "epochs": 100}'
                  />
                </FormGroup>
                <FormGroup label="Namespace" fieldId="pipeline-namespace">
                  <TextInput
                    id="pipeline-namespace"
                    value={selectedNodeData.parameters.namespace || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'namespace', value)}
                    placeholder="project-namespace"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'rayCluster' && (
              <>
                <FormGroup label="Head Node Type" fieldId="ray-head">
                  <TextInput
                    id="ray-head"
                    value={selectedNodeData.parameters.headNodeType || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'headNodeType', value)}
                    placeholder="cpu-small, cpu-medium, gpu"
                  />
                </FormGroup>
                <FormGroup label="Worker Nodes" fieldId="ray-workers">
                  <TextInput
                    id="ray-workers"
                    value={selectedNodeData.parameters.workerNodes || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'workerNodes', value)}
                    placeholder="2"
                  />
                </FormGroup>
                <FormGroup label="Ray Version" fieldId="ray-version">
                  <TextInput
                    id="ray-version"
                    value={selectedNodeData.parameters.rayVersion || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'rayVersion', value)}
                    placeholder="2.5.0"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'trustyAI' && (
              <>
                <FormGroup label="Service URL" fieldId="trusty-url">
                  <TextInput
                    id="trusty-url"
                    value={selectedNodeData.parameters.serviceUrl || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'serviceUrl', value)}
                    placeholder="http://trustyai-service:8080"
                  />
                </FormGroup>
                <FormGroup label="Inference Service" fieldId="trusty-inference">
                  <TextInput
                    id="trusty-inference"
                    value={selectedNodeData.parameters.inferenceService || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'inferenceService', value)}
                    placeholder="my-model-service"
                  />
                </FormGroup>
                <FormGroup label="Metrics Type" fieldId="trusty-metrics">
                  <TextInput
                    id="trusty-metrics"
                    value={selectedNodeData.parameters.metricsType || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'metricsType', value)}
                    placeholder="bias, fairness, explainability"
                  />
                </FormGroup>
              </>
            )}

            {selectedNodeType.type === 'dataConnection' && (
              <>
                <FormGroup label="Connection Type" fieldId="data-conn-type">
                  <TextInput
                    id="data-conn-type"
                    value={selectedNodeData.parameters.connectionType || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'connectionType', value)}
                    placeholder="s3, azure, gcp"
                  />
                </FormGroup>
                <FormGroup label="Endpoint" fieldId="data-endpoint">
                  <TextInput
                    id="data-endpoint"
                    value={selectedNodeData.parameters.endpoint || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'endpoint', value)}
                    placeholder="https://s3.amazonaws.com"
                  />
                </FormGroup>
                <FormGroup label="Bucket/Container" fieldId="data-bucket">
                  <TextInput
                    id="data-bucket"
                    value={selectedNodeData.parameters.bucket || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'bucket', value)}
                    placeholder="my-data-bucket"
                  />
                </FormGroup>
                <FormGroup label="Access Key" fieldId="data-access-key">
                  <TextInput
                    id="data-access-key"
                    type="password"
                    value={selectedNodeData.parameters.accessKey || ''}
                    onChange={(_event, value) => updateNodeParameter(selectedNode!, 'accessKey', value)}
                    placeholder="Your access key"
                  />
                </FormGroup>
              </>
            )}

            <Divider className="pf-u-my-md" />

            <Button
              variant="danger"
              className="pf-u-w-100"
              onClick={() => deleteNode(selectedNode!)}
            >
              Delete Node
            </Button>
          </div>
        ) : (
          <div className="pf-u-text-align-center pf-u-pt-xl">
            <Title headingLevel="h4" size="md" className="pf-u-color-400">
              Select a node to edit its properties
            </Title>
          </div>
        )}
      </DrawerContentBody>
    </DrawerPanelContent>
  );

  return (
    <div className="workflow-canvas-container">
      <Sidebar hasGutter>
        {NodePalette}
        <SidebarContent>
          <Drawer isExpanded={isPropertiesOpen}>
            <DrawerContent panelContent={PropertiesPanel}>
              <DrawerContentBody>
                <Card isFullHeight>
                  <CardBody className="workflow-canvas-body">
                    <div
                      ref={canvasRef}
                      className="workflow-canvas"
                      onDrop={handleCanvasDrop}
                      onDragOver={handleCanvasDragOver}
                      onClick={() => {
                        setSelectedNode(null);
                        setIsPropertiesOpen(false);
                      }}
                    >
                      {/* Grid background pattern */}
                      <div className="canvas-grid" />
                      
                      {/* Connection lines */}
                      <svg className="connections-layer">
                        {connections.map(conn => {
                          const fromNode = nodes.find(n => n.id === conn.from);
                          const toNode = nodes.find(n => n.id === conn.to);
                          
                          if (!fromNode || !toNode) return null;
                          
                          const startX = fromNode.position.x + 200; // Node width
                          const startY = fromNode.position.y + 40; // Node center
                          const endX = toNode.position.x;
                          const endY = toNode.position.y + 40;
                          
                          const controlPointX = startX + (endX - startX) / 2;
                          
                          return (
                            <g key={conn.id}>
                              <path
                                d={`M ${startX} ${startY} C ${controlPointX} ${startY}, ${controlPointX} ${endY}, ${endX} ${endY}`}
                                stroke="#3b82f6"
                                strokeWidth="2"
                                fill="none"
                                markerEnd="url(#arrowhead)"
                                className="connection-path"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm('Delete this connection?')) {
                                    deleteConnection(conn.id);
                                  }
                                }}
                                style={{ cursor: 'pointer' }}
                              />
                              {/* Connection label */}
                              <text
                                x={startX + (endX - startX) / 2}
                                y={startY + (endY - startY) / 2 - 8}
                                fill="#6b7280"
                                fontSize="10"
                                textAnchor="middle"
                                className="connection-label"
                              >
                                data flow
                              </text>
                            </g>
                          );
                        })}
                        
                        {/* Arrow marker definition */}
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#3b82f6"
                            />
                          </marker>
                        </defs>
                      </svg>

                      {/* Workflow Nodes */}
                      {nodes.map(node => {
                        const nodeType = NODE_TYPES.find(nt => nt.type === node.type);
                        const isSelected = selectedNode === node.id;
                        const outgoingConnections = connections.filter(conn => conn.from === node.id);

                        return (
                          <div
                            key={node.id}
                            className={`workflow-node ${isSelected ? 'selected' : ''}`}
                            style={{
                              left: node.position.x,
                              top: node.position.y,
                              borderColor: nodeType?.color || '#6b7280',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectNode(node.id);
                            }}
                            onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                          >
                            {/* Action Bubbles */}
                            <div className="node-action-bubbles">
                              <button
                                className="action-bubble launch-bubble"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNodeAction(node.id, 'launch');
                                }}
                                title="Launch node"
                              >
                                <ExternalLinkAltIcon />
                              </button>
                              <button
                                className="action-bubble chat-bubble"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNodeAction(node.id, 'chat');
                                }}
                                title="Chat with node"
                              >
                                <CommentsIcon />
                              </button>
                              <button
                                className="action-bubble reload-bubble"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNodeAction(node.id, 'reload');
                                }}
                                title="Reload node"
                              >
                                <RedoIcon />
                              </button>
                            </div>

                            <div className="workflow-node-header" style={{ backgroundColor: nodeType?.color || '#6b7280' }}>
                              <div className="workflow-node-icon">
                                {nodeType?.icon || <EditIcon />}
                              </div>
                              <div className="workflow-node-title">
                                {node.name}
                              </div>
                              {/* Connection count indicator */}
                              {outgoingConnections.length > 0 && (
                                <div className="connection-count">
                                  {outgoingConnections.length}
                                </div>
                              )}
                            </div>
                            <div className="workflow-node-body">
                              <div className="workflow-node-description">
                                {nodeType?.description || 'Custom node'}
                              </div>
                              
                              {/* Connection points */}
                              <div 
                                className="node-connection-input"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isConnecting) {
                                    finishConnection(node.id, 'input');
                                  } else {
                                    startConnection(node.id, 'input');
                                  }
                                }}
                              />
                              <div 
                                className="node-connection-output"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isConnecting) {
                                    finishConnection(node.id, 'output');
                                  } else {
                                    startConnection(node.id, 'output');
                                  }
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}

                      {/* Helper text when canvas is empty */}
                      {nodes.length === 0 && (
                        <div className="canvas-empty-state">
                          <Title headingLevel="h2" size="lg" className="pf-u-color-400 pf-u-text-align-center">
                            Drag nodes from the left panel to start building your workflow
                          </Title>
                          <Button
                            variant="primary"
                            className="pf-u-mt-md"
                            onClick={() => createNode('manualTrigger', 200, 200)}
                          >
                            Add Manual Trigger
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </DrawerContentBody>
            </DrawerContent>
          </Drawer>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default WorkflowCanvasEditor;
