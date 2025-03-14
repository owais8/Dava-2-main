"use client";

import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { useSession } from "next-auth/react";

import { AdCampaignCalculator } from './components/AdCampaignCalculator';
import { Table } from './components/Table';

interface Filters {
  platforms: string[];
  sources: string[];
  mediums: string[];
  campaign_names: string[];
  campaign_term: string[];
}

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
const API = process.env.NEXT_PUBLIC_API_URL;

export function CampaignCalculator() {
  const { data: session } = useSession();
  const token = session?.user.accesstoken;
  const [filters, setFilters] = useState<Filters>({
    platforms: [],
    sources: [],
    mediums: [],
    campaign_names: [],
    campaign_term: []
  });
  const [calculations, setCalculations] = useState<CalculationResult[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // First request
        const response = await fetch(`${API}/api/get_filters`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setFilters(data.data);
  
        // Second request with token
        const calcResponse = await fetch(`${API}/api/view_calculations`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (!calcResponse.ok) throw new Error(`HTTP error! Status: ${calcResponse.status}`);
        
        const calcData = await calcResponse.json();
        setCalculations(calcData.data);
      } catch (error) {

        return error;
        // Handle error display
      }
    };
  
    fetchFilters();
  }, []);

  const handleCalculate = async (formData: any) => {
    try {
      const response = await fetch(`${API}/api/get_calculations`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: 4
        }),
      });

      if (!response.ok) throw new Error('Calculation failed');

      const newCalculation = await response.json();
      setCalculations(prev => [newCalculation.data, ...prev]);
    } catch (error) {
      return error;
      // Handle error display here
    }
  };

  return (
    <Stack spacing={6}>
      <AdCampaignCalculator 
        filters={filters}
        onSubmit={handleCalculate}
      />
      <Table data={calculations} />
      </Stack>
  );
}
