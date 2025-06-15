import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  Plus, 
  Minus, 
  Zap,
  RefreshCw,
  MessageSquare,
  CreditCard,
  User
} from 'lucide-react';
import { TokenTransaction } from '@/lib/token-manager';

interface TokenUsageHistoryProps {
  userId: string;
  transactions: TokenTransaction[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function TokenUsageHistory({ 
  userId, 
  transactions, 
  isLoading = false,
  onRefresh
}: TokenUsageHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'deduction' | 'addition'>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const getTransactionIcon = (transaction: TokenTransaction) => {
    if (transaction.type === 'deduction') {
      return <Minus className="h-4 w-4 text-red-500" />;
    } else if (transaction.type === 'addition') {
      return <Plus className="h-4 w-4 text-green-500" />;
    } else {
      return <RefreshCw className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'prompt':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'subscription':
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      case 'topup':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'admin':
        return <User className="h-4 w-4 text-orange-500" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 text-yellow-500" />;
      default:
        return <Zap className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'prompt':
        return 'AI Prompt';
      case 'subscription':
        return 'Subscription';
      case 'topup':
        return 'Token Top-up';
      case 'admin':
        return 'Admin Adjustment';
      case 'refund':
        return 'Refund';
      default:
        return source;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatTokens = (tokens: number): string => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const downloadCSV = () => {
    const headers = ['Date', 'Type', 'Source', 'Amount', 'Model', 'Prompt ID'];
    
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [
        new Date(t.timestamp).toISOString(),
        t.type,
        t.source,
        t.amount,
        t.modelId || '',
        t.promptId || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `token-usage-${userId}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Token Usage History
          </CardTitle>
          <CardDescription>Loading your token usage history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Token Usage History
            </CardTitle>
            <CardDescription>
              Track your token consumption over time
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'deduction' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('deduction')}
          >
            <Minus className="h-4 w-4 mr-2" />
            Usage
          </Button>
          <Button 
            variant={filter === 'addition' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('addition')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Additions
          </Button>
          
          <div className="ml-auto flex items-center space-x-2">
            <Button 
              variant={timeRange === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              Month
            </Button>
            <Button 
              variant={timeRange === 'year' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('year')}
            >
              Year
            </Button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm text-muted-foreground">
                {filter !== 'all' 
                  ? `Try changing your filter to see more results` 
                  : `You don't have any token transactions yet`}
              </p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'addition' 
                      ? 'bg-green-100' 
                      : transaction.type === 'deduction'
                      ? 'bg-red-100'
                      : 'bg-blue-100'
                  }`}>
                    {getTransactionIcon(transaction)}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {transaction.type === 'addition' ? 'Added' : 'Used'} {formatTokens(transaction.amount)} tokens
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getSourceIcon(transaction.source)}
                        <span className="ml-1">{getSourceLabel(transaction.source)}</span>
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {formatDate(transaction.timestamp)}
                      {transaction.modelId && (
                        <span className="ml-2">• Model: {transaction.modelId}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`text-lg font-semibold ${
                  transaction.type === 'addition' 
                    ? 'text-green-600' 
                    : transaction.type === 'deduction'
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}>
                  {transaction.type === 'addition' ? '+' : '-'}{formatTokens(transaction.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}