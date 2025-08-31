import React, { useState } from 'react';
import { Send, Phone, Mail, Users, MessageSquare, Plus } from 'lucide-react';

const MessageCenter: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'compose' | 'sent' | 'scheduled'>('compose');
  const [messageType, setMessageType] = useState<'sms' | 'email'>('sms');
  const [recipients, setRecipients] = useState<'all' | 'grade' | 'individual'>('grade');
  const [message, setMessage] = useState('');

  const recentMessages = [
    { id: 1, recipient: 'Grade 3 Parents', message: 'Parent-teacher conference scheduled for next week', sent: '2 hours ago', type: 'SMS' },
    { id: 2, recipient: 'All Parents', message: 'School closure due to weather conditions', sent: '1 day ago', type: 'Email' },
    { id: 3, recipient: 'John Kamau\'s Parent', message: 'Excellent progress in reading activities', sent: '2 days ago', type: 'SMS' }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Simulate sending message
    alert('Message sent successfully!');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Communication Center</h1>
        <p className="text-purple-100">Connect with parents and send important updates</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'compose', label: 'Compose Message', icon: Plus },
              { id: 'sent', label: 'Sent Messages', icon: MessageSquare },
              { id: 'scheduled', label: 'Scheduled', icon: Phone }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'compose' && (
            <div className="space-y-6">
              {/* Message Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Message Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setMessageType('sms')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      messageType === 'sms'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    <span>SMS</span>
                  </button>
                  <button
                    onClick={() => setMessageType('email')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      messageType === 'email'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              {/* Recipients Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Recipients</label>
                <select
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="grade">Specific Grade Level</option>
                  <option value="all">All Parents</option>
                  <option value="individual">Individual Parent</option>
                </select>
              </div>

              {recipients === 'grade' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Grade</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>PP1</option>
                    <option>PP2</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                  </select>
                </div>
              )}

              {/* Message Composition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Message {messageType === 'sms' && <span className="text-gray-500">(160 characters max)</span>}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={messageType === 'sms' ? 160 : undefined}
                  rows={messageType === 'sms' ? 3 : 5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={`Type your ${messageType} message here...`}
                />
                {messageType === 'sms' && (
                  <p className="text-sm text-gray-500 mt-1">{message.length}/160 characters</p>
                )}
              </div>

              <button
                onClick={handleSendMessage}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Send {messageType.toUpperCase()}</span>
              </button>
            </div>
          )}

          {selectedTab === 'sent' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{msg.recipient}</p>
                      <p className="text-sm text-gray-600">{msg.message}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded ${
                        msg.type === 'SMS' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {msg.type}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{msg.sent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;