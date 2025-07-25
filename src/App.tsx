import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import EmergencyModal from "./EmergencyModal";
import IncidentReport from "./IncidentReport";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Types for our data structures
interface ThreatEvent {
  id: string;
  timestamp: number;
  source: string;
  target: string;
  type: 'intrusion' | 'malware' | 'ddos' | 'reconnaissance' | 'data_exfiltration';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'mitigated' | 'investigating';
  honeypot: string;
  attackVector: string;
  location: string;
}

interface HoneypotService {
  id: string;
  name: string;
  type: 'web_server' | 'database' | 'ftp' | 'ssh' | 'email' | 'api';
  status: 'active' | 'inactive' | 'compromised';
  interactions: number;
  threats_detected: number;
  last_activity: number;
  ai_confidence: number;
}

interface SystemMetrics {
  cpu_usage: number;
  memory_usage: number;
  network_traffic: number;
  active_connections: number;
  threats_blocked: number;
  honeypots_active: number;
}

interface AnomalyAlert {
  id: string;
  timestamp: number;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  source: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'threats' | 'honeypots' | 'ai-defense' | 'anomalies'>('dashboard');
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [honeypots, setHoneypots] = useState<HoneypotService[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu_usage: 45,
    memory_usage: 62,
    network_traffic: 78,
    active_connections: 1247,
    threats_blocked: 89,
    honeypots_active: 12
  });
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>([]);
  const [aiDefenseMode, setAiDefenseMode] = useState<'passive' | 'active' | 'aggressive'>('active');
  const [autoResponse, setAutoResponse] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    // Initialize data
    initializeData();

    // Set up real-time updates
    const interval = setInterval(() => {
      updateMetrics();
      maybeAddThreat();
      maybeAddAnomaly();
      updateHoneypots();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const initializeData = () => {
    // Initialize honeypots
    const initialHoneypots: HoneypotService[] = [
      { id: '1', name: 'Web-Trap-01', type: 'web_server', status: 'active', interactions: 45, threats_detected: 12, last_activity: Date.now() - 300000, ai_confidence: 94 },
      { id: '2', name: 'DB-Honey-02', type: 'database', status: 'active', interactions: 23, threats_detected: 8, last_activity: Date.now() - 150000, ai_confidence: 87 },
      { id: '3', name: 'SSH-Decoy-03', type: 'ssh', status: 'compromised', interactions: 67, threats_detected: 19, last_activity: Date.now() - 60000, ai_confidence: 96 },
      { id: '4', name: 'FTP-Lure-04', type: 'ftp', status: 'active', interactions: 12, threats_detected: 3, last_activity: Date.now() - 900000, ai_confidence: 78 },
      { id: '5', name: 'API-Trap-05', type: 'api', status: 'active', interactions: 89, threats_detected: 24, last_activity: Date.now() - 45000, ai_confidence: 91 }
    ];
    setHoneypots(initialHoneypots);

    // Initialize some threats
    const initialThreats: ThreatEvent[] = [
      {
        id: '1',
        timestamp: Date.now() - 120000,
        source: '192.168.1.100',
        target: 'Web-Trap-01',
        type: 'intrusion',
        severity: 'high',
        status: 'mitigated',
        honeypot: 'Web-Trap-01',
        attackVector: 'SQL Injection',
        location: 'Russia'
      },
      {
        id: '2',
        timestamp: Date.now() - 300000,
        source: '10.0.0.45',
        target: 'SSH-Decoy-03',
        type: 'reconnaissance',
        severity: 'medium',
        status: 'investigating',
        honeypot: 'SSH-Decoy-03',
        attackVector: 'Port Scanning',
        location: 'China'
      }
    ];
    setThreats(initialThreats);
  };

  const updateMetrics = () => {
    setMetrics(prev => ({
      cpu_usage: Math.max(20, Math.min(95, prev.cpu_usage + (Math.random() - 0.5) * 10)),
      memory_usage: Math.max(30, Math.min(90, prev.memory_usage + (Math.random() - 0.5) * 8)),
      network_traffic: Math.max(10, Math.min(100, prev.network_traffic + (Math.random() - 0.5) * 15)),
      active_connections: Math.max(800, Math.min(2000, prev.active_connections + Math.floor((Math.random() - 0.5) * 100))),
      threats_blocked: prev.threats_blocked + (Math.random() > 0.7 ? 1 : 0),
      honeypots_active: prev.honeypots_active
    }));
  };

  const maybeAddThreat = () => {
    if (Math.random() > 0.85) {
      const threatTypes: ThreatEvent['type'][] = ['intrusion', 'malware', 'ddos', 'reconnaissance', 'data_exfiltration'];
      const severities: ThreatEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
      const sources = ['192.168.1.100', '10.0.0.45', '172.16.0.23', '203.0.113.5', '198.51.100.14'];
      const honeypotNames = honeypots.map(h => h.name);
      const attackVectors = ['SQL Injection', 'XSS Attack', 'Buffer Overflow', 'Port Scanning', 'Brute Force', 'Malware Upload'];
      const locations = ['Russia', 'China', 'North Korea', 'Iran', 'Unknown', 'Brazil', 'Romania'];

      const newThreat: ThreatEvent = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        source: sources[Math.floor(Math.random() * sources.length)],
        target: honeypotNames[Math.floor(Math.random() * honeypotNames.length)],
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        status: 'active',
        honeypot: honeypotNames[Math.floor(Math.random() * honeypotNames.length)],
        attackVector: attackVectors[Math.floor(Math.random() * attackVectors.length)],
        location: locations[Math.floor(Math.random() * locations.length)]
      };

      setThreats(prev => [newThreat, ...prev.slice(0, 49)]);
      
      if (newThreat.severity === 'critical' || newThreat.severity === 'high') {
        toast.error(`🚨 ${newThreat.severity.toUpperCase()} threat detected: ${newThreat.attackVector} from ${newThreat.location}`);
      }

      // Auto-response simulation
      if (autoResponse && (newThreat.severity === 'high' || newThreat.severity === 'critical')) {
        setTimeout(() => {
          setThreats(prev => prev.map(t => 
            t.id === newThreat.id ? { ...t, status: 'mitigated' } : t
          ));
          toast.success(`✅ Threat ${newThreat.id} automatically mitigated by AI defense system`);
        }, 3000 + Math.random() * 5000);
      }
    }
  };

  const maybeAddAnomaly = () => {
    if (Math.random() > 0.9) {
      const anomalyTypes = [
        'Unusual traffic pattern detected',
        'Abnormal login attempts',
        'Suspicious file access',
        'Network latency spike',
        'Memory usage anomaly',
        'Unexpected service behavior'
      ];

      const newAnomaly: AnomalyAlert = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
        description: `AI detected unusual behavior pattern requiring investigation`,
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        confidence: 70 + Math.random() * 30,
        source: `System-${Math.floor(Math.random() * 10) + 1}`
      };

      setAnomalies(prev => [newAnomaly, ...prev.slice(0, 19)]);
    }
  };

  const updateHoneypots = () => {
    setHoneypots(prev => prev.map(honeypot => ({
      ...honeypot,
      interactions: honeypot.interactions + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0),
      threats_detected: honeypot.threats_detected + (Math.random() > 0.9 ? 1 : 0),
      last_activity: Math.random() > 0.8 ? Date.now() : honeypot.last_activity,
      ai_confidence: Math.max(60, Math.min(99, honeypot.ai_confidence + (Math.random() - 0.5) * 5))
    })));
  };

  const deployNewHoneypot = () => {
    const types: HoneypotService['type'][] = ['web_server', 'database', 'ftp', 'ssh', 'email', 'api'];
    const newHoneypot: HoneypotService = {
      id: Date.now().toString(),
      name: `${types[Math.floor(Math.random() * types.length)].toUpperCase()}-${Math.floor(Math.random() * 100)}`,
      type: types[Math.floor(Math.random() * types.length)],
      status: 'active',
      interactions: 0,
      threats_detected: 0,
      last_activity: Date.now(),
      ai_confidence: 85 + Math.random() * 10
    };

    setHoneypots(prev => [...prev, newHoneypot]);
    setMetrics(prev => ({ ...prev, honeypots_active: prev.honeypots_active + 1 }));
    toast.success(`🕸️ New honeypot "${newHoneypot.name}" deployed successfully`);
  };

  return (
    <Router>
      <EmergencyModal />
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {currentView === 'dashboard' && (
                  <DashboardView 
                    metrics={metrics} 
                    threats={threats} 
                    honeypots={honeypots}
                    anomalies={anomalies}
                  />
                )}
                {currentView === 'threats' && (
                  <ThreatsView threats={threats} setThreats={setThreats} />
                )}
                {currentView === 'honeypots' && (
                  <HoneypotsView 
                    honeypots={honeypots} 
                    setHoneypots={setHoneypots}
                    onDeploy={deployNewHoneypot}
                  />
                )}
                {currentView === 'ai-defense' && (
                  <AIDefenseView 
                    aiDefenseMode={aiDefenseMode}
                    setAiDefenseMode={setAiDefenseMode}
                    autoResponse={autoResponse}
                    setAutoResponse={setAutoResponse}
                    metrics={metrics}
                  />
                )}
                {currentView === 'anomalies' && (
                  <AnomaliesView anomalies={anomalies} setAnomalies={setAnomalies} />
                )}
              </>
            }
          />
          <Route path="/incident-report" element={<IncidentReport />} />
        </Routes>
      </main>
      
      <Toaster position="top-right" />
    </Router>
  );
}

function Header({ currentView, setCurrentView }: { 
  currentView: string; 
  setCurrentView: (view: 'dashboard' | 'threats' | 'honeypots' | 'ai-defense' | 'anomalies') => void;
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'threats', label: 'Threats', icon: '🚨' },
    { id: 'honeypots', label: 'Honeypots', icon: '🕸️' },
    { id: 'ai-defense', label: 'AI Defense', icon: '🤖' },
    { id: 'anomalies', label: 'Anomalies', icon: '⚠️' }
  ];

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <h1 className="text-xl font-bold">Deception Network Control</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">System Online</span>
          </div>
        </div>
        
        <nav className="flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                currentView === item.id
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function DashboardView({ 
  metrics, 
  threats, 
  honeypots, 
  anomalies 
}: { 
  metrics: SystemMetrics; 
  threats: ThreatEvent[]; 
  honeypots: HoneypotService[];
  anomalies: AnomalyAlert[];
}) {
  const recentThreats = threats.slice(0, 5);
  const activeHoneypots = honeypots.filter(h => h.status === 'active').length;
  const compromisedHoneypots = honeypots.filter(h => h.status === 'compromised').length;

  return (
    <div className="space-y-6">
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Threats"
          value={threats.filter(t => t.status === 'active').length}
          icon="🚨"
          color="red"
          subtitle="Real-time detection"
        />
        <MetricCard
          title="Honeypots Active"
          value={activeHoneypots}
          icon="🕸️"
          color="blue"
          subtitle={`${compromisedHoneypots} compromised`}
        />
        <MetricCard
          title="Threats Blocked"
          value={metrics.threats_blocked}
          icon="🛡️"
          color="green"
          subtitle="Auto-mitigated"
        />
        <MetricCard
          title="AI Confidence"
          value="94%"
          icon="🤖"
          color="purple"
          subtitle="System learning"
        />
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemMetricsChart metrics={metrics} />
        <ThreatMapVisualization threats={threats} />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentThreatsPanel threats={recentThreats} />
        <RecentAnomaliesPanel anomalies={anomalies.slice(0, 5)} />
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon, 
  color, 
  subtitle 
}: { 
  title: string; 
  value: number | string; 
  icon: string; 
  color: string; 
  subtitle: string;
}) {
  const colorClasses = {
    red: 'border-red-500/30 bg-red-500/10',
    blue: 'border-blue-500/30 bg-blue-500/10',
    green: 'border-green-500/30 bg-green-500/10',
    purple: 'border-purple-500/30 bg-purple-500/10'
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]} bg-gray-800/50`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

function SystemMetricsChart({ metrics }: { metrics: SystemMetrics }) {
  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold mb-4">System Performance</h3>
      <div className="space-y-4">
        <MetricBar label="CPU Usage" value={metrics.cpu_usage} color="red" />
        <MetricBar label="Memory Usage" value={metrics.memory_usage} color="blue" />
        <MetricBar label="Network Traffic" value={metrics.network_traffic} color="green" />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Active Connections:</span>
            <span className="ml-2 font-semibold">{metrics.active_connections.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-400">Uptime:</span>
            <span className="ml-2 font-semibold text-green-400">99.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function ThreatMapVisualization({ threats }: { threats: ThreatEvent[] }) {
  const threatsByLocation = threats.reduce((acc, threat) => {
    acc[threat.location] = (acc[threat.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLocations = Object.entries(threatsByLocation)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold mb-4">Threat Origins</h3>
      <div className="space-y-3">
        {topLocations.map(([location, count]) => (
          <div key={location} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{count} threats</span>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-red-500 rounded-full"
                  style={{ width: `${(count / Math.max(...Object.values(threatsByLocation))) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 text-center">
        <div className="text-2xl mb-2">🌍</div>
        <p className="text-sm text-gray-400">Global threat monitoring active</p>
      </div>
    </div>
  );
}

function RecentThreatsPanel({ threats }: { threats: ThreatEvent[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🔴';
      case 'mitigated': return '✅';
      case 'investigating': return '🔍';
      default: return '❓';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Threats</h3>
      <div className="space-y-3">
        {threats.map((threat) => (
          <div key={threat.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <span>{getStatusIcon(threat.status)}</span>
              <div>
                <div className="font-medium">{threat.attackVector}</div>
                <div className="text-sm text-gray-400">
                  {threat.source} → {threat.target}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${getSeverityColor(threat.severity)}`}>
                {threat.severity.toUpperCase()}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(threat.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentAnomaliesPanel({ anomalies }: { anomalies: AnomalyAlert[] }) {
  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold mb-4">AI Anomaly Detection</h3>
      <div className="space-y-3">
        {anomalies.map((anomaly) => (
          <div key={anomaly.id} className="p-3 bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{anomaly.type}</span>
              <span className="text-sm text-blue-400">{Math.round(anomaly.confidence)}% confidence</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{anomaly.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Source: {anomaly.source}</span>
              <span className="text-gray-500">{new Date(anomaly.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreatsView({ threats, setThreats }: { threats: ThreatEvent[]; setThreats: (threats: ThreatEvent[]) => void }) {
  const [filter, setFilter] = useState<'all' | 'active' | 'mitigated' | 'investigating'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredThreats = threats.filter(threat => {
    const statusMatch = filter === 'all' || threat.status === filter;
    const severityMatch = severityFilter === 'all' || threat.severity === severityFilter;
    return statusMatch && severityMatch;
  });

  const mitigateThreat = (threatId: string) => {
    setThreats(threats.map(threat => 
      threat.id === threatId ? { ...threat, status: 'mitigated' } : threat
    ));
    toast.success('Threat mitigated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Threat Management</h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="mitigated">Mitigated</option>
            <option value="investigating">Investigating</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr className="text-left">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Source</th>
                <th className="p-4">Target</th>
                <th className="p-4">Attack Vector</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Location</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                  <td className="p-4 text-sm">
                    {new Date(threat.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-sm">{threat.source}</td>
                  <td className="p-4 text-sm">{threat.target}</td>
                  <td className="p-4 text-sm">{threat.attackVector}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      threat.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      threat.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      threat.status === 'active' ? 'bg-red-500/20 text-red-400' :
                      threat.status === 'mitigated' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {threat.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{threat.location}</td>
                  <td className="p-4">
                    {threat.status === 'active' && (
                      <button
                        onClick={() => mitigateThreat(threat.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                      >
                        Mitigate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HoneypotsView({ 
  honeypots, 
  setHoneypots, 
  onDeploy 
}: { 
  honeypots: HoneypotService[]; 
  setHoneypots: (honeypots: HoneypotService[]) => void;
  onDeploy: () => void;
}) {
  const toggleHoneypot = (id: string) => {
    setHoneypots(honeypots.map(honeypot => 
      honeypot.id === id 
        ? { ...honeypot, status: honeypot.status === 'active' ? 'inactive' : 'active' }
        : honeypot
    ));
  };

  const removeHoneypot = (id: string) => {
    setHoneypots(honeypots.filter(h => h.id !== id));
    toast.success('Honeypot removed successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Honeypot Management</h2>
        <button
          onClick={onDeploy}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>🚀</span>
          <span>Deploy New Honeypot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {honeypots.map((honeypot) => (
          <div key={honeypot.id} className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{honeypot.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                honeypot.status === 'active' ? 'bg-green-500/20 text-green-400' :
                honeypot.status === 'compromised' ? 'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {honeypot.status.toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="capitalize">{honeypot.type.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interactions:</span>
                <span>{honeypot.interactions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Threats Detected:</span>
                <span className="text-red-400">{honeypot.threats_detected}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">AI Confidence:</span>
                <span className="text-blue-400">{Math.round(honeypot.ai_confidence)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Activity:</span>
                <span className="text-sm">
                  {new Date(honeypot.last_activity).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => toggleHoneypot(honeypot.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                  honeypot.status === 'active'
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {honeypot.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => removeHoneypot(honeypot.id)}
                className="px-3 py-2 bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 rounded-lg text-sm transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIDefenseView({ 
  aiDefenseMode, 
  setAiDefenseMode, 
  autoResponse, 
  setAutoResponse, 
  metrics 
}: {
  aiDefenseMode: 'passive' | 'active' | 'aggressive';
  setAiDefenseMode: (mode: 'passive' | 'active' | 'aggressive') => void;
  autoResponse: boolean;
  setAutoResponse: (enabled: boolean) => void;
  metrics: SystemMetrics;
}) {
  const [learningRate, setLearningRate] = useState(0.75);
  const [adaptationSpeed, setAdaptationSpeed] = useState(0.6);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Defense System</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Defense Mode Control */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Defense Mode</h3>
          <div className="space-y-3">
            {[
              { mode: 'passive', label: 'Passive', description: 'Monitor and log threats only', color: 'blue' },
              { mode: 'active', label: 'Active', description: 'Automated threat mitigation', color: 'green' },
              { mode: 'aggressive', label: 'Aggressive', description: 'Proactive threat hunting', color: 'red' }
            ].map(({ mode, label, description, color }) => (
              <label key={mode} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="defenseMode"
                  value={mode}
                  checked={aiDefenseMode === mode}
                  onChange={(e) => setAiDefenseMode(e.target.value as any)}
                  className="text-red-500"
                />
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-400">{description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Auto Response Settings */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Response Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span>Auto-Response</span>
              <input
                type="checkbox"
                checked={autoResponse}
                onChange={(e) => setAutoResponse(e.target.checked)}
                className="w-5 h-5"
              />
            </label>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Learning Rate: {Math.round(learningRate * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Adaptation Speed: {Math.round(adaptationSpeed * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={adaptationSpeed}
                onChange={(e) => setAdaptationSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">AI Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">94.7%</div>
            <div className="text-sm text-gray-400">Detection Accuracy</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="w-[94.7%] bg-green-500 h-2 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2.3s</div>
            <div className="text-sm text-gray-400">Avg Response Time</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="w-[85%] bg-blue-500 h-2 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">99.1%</div>
            <div className="text-sm text-gray-400">False Positive Rate</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="w-[99.1%] bg-purple-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Network Visualization */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Neural Network Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Learning Patterns</h4>
            <div className="space-y-2">
              {[
                { pattern: 'SQL Injection Variants', confidence: 96 },
                { pattern: 'Port Scan Sequences', confidence: 89 },
                { pattern: 'Brute Force Attempts', confidence: 94 },
                { pattern: 'Malware Signatures', confidence: 87 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.pattern}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{item.confidence}%</span>
                    <div className="w-16 bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${item.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">Adaptive Responses</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Honeypot deployment optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Threat signatures updated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Network topology adapted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Response time improved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnomaliesView({ anomalies, setAnomalies }: { anomalies: AnomalyAlert[]; setAnomalies: (anomalies: AnomalyAlert[]) => void }) {
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredAnomalies = anomalies.filter(anomaly => 
    severityFilter === 'all' || anomaly.severity === severityFilter
  );

  const dismissAnomaly = (id: string) => {
    setAnomalies(anomalies.filter(a => a.id !== id));
    toast.success('Anomaly dismissed');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Anomaly Detection</h2>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as any)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
        >
          <option value="all">All Severity</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnomalies.map((anomaly) => (
          <div key={anomaly.id} className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{anomaly.type}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                anomaly.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                anomaly.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {anomaly.severity.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-300 mb-4">{anomaly.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Confidence:</span>
                <span className="text-blue-400">{Math.round(anomaly.confidence)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Source:</span>
                <span>{anomaly.source}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Detected:</span>
                <span>{new Date(anomaly.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => dismissAnomaly(anomaly.id)}
                className="flex-1 px-3 py-2 bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 rounded-lg text-sm transition-colors"
              >
                Dismiss
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg text-sm transition-colors">
                Investigate
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAnomalies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No Anomalies Found</h3>
          <p className="text-gray-400">AI monitoring is active and no anomalies match your current filter.</p>
        </div>
      )}
    </div>
  );
}
