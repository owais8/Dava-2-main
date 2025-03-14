/* eslint-disable no-console */
'use client';

import React, { useEffect,useState } from 'react'; // Added useState and useEffect

import { Tooltip } from '@mui/material';
import { useSession } from "next-auth/react";

import { Card, PageHeading, TableSimple } from '@/components';



interface CalculationResult {
  id: number;
  campaignName: string;
  start_date: string;
  end_date: string;
  platform: string;
  source: string;
  medium: string;
  total_spend: number;
  cold_leads: number;
  cost_per_cold_lead: number;
  hot_leads: number;
  cost_per_hot_lead: number;
  acquisitions: number;
  cost_per_acquisition: number;
  links: string;
}
interface TableProps {
  data: CalculationResult[];
}
const columns: TColumn[] = [
  {
    id: 'campaignName',
    label: 'Campaign Name',
    minWidth: 120,
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
  },
  {
    id: 'url',
    label: 'URL',
    minWidth: 130,
    maxWidth: 130,
    format: (value: string) => (
      <Tooltip title={value} placement="top" arrow>
        <span className="line-clamp-1">{value}</span>
      </Tooltip>
    ),
  },
  {
    id: 'platform',
    label: 'Platform',
    minWidth: 130,
  },
  {
    id: 'source',
    label: 'Source',
    minWidth: 130,
  },
  {
    id: 'medium',
    label: 'Medium',
    minWidth: 130,
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 130,
  },
  {
    id: 'term',
    label: 'Term',
    minWidth: 130,
  },
  {
    id: 'totalSpend',
    label: 'Total Spend',
    minWidth: 120,
  },
  {
    id: 'coldLeads',
    label: 'Cold Leads',
    minWidth: 120,
  },
  {
    id: 'costPerVisit',
    label: 'Cost Per Visit',
    minWidth: 120,
    maxWidth: 120,
    headerClassName: 'bg-blur-start',
  },
  {
    id: 'costPerColdLead',
    label: 'Cost Per Cold Lead',
    minWidth: 120,
  },
  {
    id: 'hotLead',
    label: 'Hot Leads',
    minWidth: 120,
  },
  {
    id: 'costPerHotLead',
    label: 'Cost Per Hot Lead',
    minWidth: 120,
  },
  {
    id: 'acquisitions',
    label: 'Acquisitions',
    minWidth: 120,
  },
  {
    id: 'costPerAcquisitions',
    label: 'Cost Per Acquisition',
    minWidth: 120,
  },
  {
    id: 'revenue',
    label: 'Revenue',
    minWidth: 120,
  },
  {
    id: 'roas',
    label: 'ROAS',
    headerClassName: 'bg-blur-end',
    minWidth: 120,
    maxWidth: 120,
  },
  {
    id: 'action',
    label: '',
    align: 'center',
    isFixedColumn: true,
  },
];

export const Table = ({ data }: TableProps) => {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const token = useSession().data?.user.accesstoken;
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const transformedData = data.map(item => ({
    id: item.id,
    campaignName: item.campaignName || 'N/A',
    date: `${new Date(item.start_date).toLocaleDateString()} - ${new Date(item.end_date).toLocaleDateString()}`,
    url: item.links,
    platform: item.platform || 'N/A',
    source: item.source || 'N/A',
    medium: item.medium || 'N/A',
    type: 'N/A', // Add if available in your data
    term: 'N/A', // Add if available in your data
    totalSpend: formatCurrency(item.total_spend),
    coldLeads: item.cold_leads.toString(),
    costPerVisit: 'N/A', // Add if available in your data
    costPerColdLead: formatCurrency(item.cost_per_cold_lead),
    hotLead: item.hot_leads.toString(),
    costPerHotLead: formatCurrency(item.cost_per_hot_lead),
    acquisitions: item.acquisitions.toString(),
    costPerAcquisitions: formatCurrency(item.cost_per_acquisition),
    revenue: 'N/A', // Add if available in your data
    roas: 'N/A', // Add if available in your data
    action: [
      { id: 'recalculate' as TAction, label: 'Recalculate' },
      { id: 'delete' as TAction, label: 'Delete' },
    ] as TRowAction[],
  }));
  const [tableData, setTableData] = useState(transformedData); // Local state

  // Keep local state in sync with props
  useEffect(() => {
    setTableData(transformedData);
  }, [data]);
  const handleActionClick = async ({ actionType, id }: TActionClick) => {
    if (actionType === 'delete') {
      try {
        if (!token) {
          console.error('No authentication token found');
          
          return;
        }

        const response = await fetch(`${API}/api/delete_calculation/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete calculation');
        }

        // Update local state by filtering out deleted item
        setTableData(prevData => prevData.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting calculation:', error);
        // Add error handling (e.g., show toast notification)
      }
    }
    // Handle other actions (recalculate) if needed
  };


  return (
    <Card>
      <PageHeading title="Results" titleVariant={{ variant: 'h5', fontWeight: 500 }} />
      <TableSimple
        isShowBgBlur
        columns={columns}
        rows={tableData}
        onActionClick={handleActionClick}
      />
    </Card>
  );
};
