
-- Create table for crop recommendations
CREATE TABLE public.crop_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  soil_type TEXT NOT NULL,
  ph_level DECIMAL(3,1) NOT NULL,
  nitrogen DECIMAL(5,2) NOT NULL,
  phosphorus DECIMAL(5,2) NOT NULL,
  potassium DECIMAL(5,2) NOT NULL,
  temperature DECIMAL(4,1) NOT NULL,
  humidity DECIMAL(4,1) NOT NULL,
  rainfall DECIMAL(6,2) NOT NULL,
  recommended_crops JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for fertilizer recommendations
CREATE TABLE public.fertilizer_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  crop_type TEXT NOT NULL,
  nitrogen DECIMAL(5,2) NOT NULL,
  phosphorus DECIMAL(5,2) NOT NULL,
  potassium DECIMAL(5,2) NOT NULL,
  ph_level DECIMAL(3,1) NOT NULL,
  recommended_fertilizers JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for yield predictions
CREATE TABLE public.yield_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  crop_type TEXT NOT NULL,
  region TEXT NOT NULL,
  sowing_date DATE NOT NULL,
  harvest_date DATE NOT NULL,
  weather_conditions TEXT NOT NULL,
  predicted_yield DECIMAL(6,2),
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for crop rotation plans
CREATE TABLE public.crop_rotation_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  field_data JSONB NOT NULL,
  soil_type TEXT NOT NULL,
  rotation_plan JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for pest and disease predictions
CREATE TABLE public.pest_disease_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  crop_type TEXT,
  location TEXT,
  symptoms TEXT,
  image_url TEXT,
  predicted_issue JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for irrigation advice
CREATE TABLE public.irrigation_advice (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  crop_type TEXT NOT NULL,
  soil_type TEXT NOT NULL,
  growth_stage TEXT NOT NULL,
  location TEXT NOT NULL,
  irrigation_schedule JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for government scheme checks
CREATE TABLE public.government_scheme_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  crop_type TEXT NOT NULL,
  landholding_size DECIMAL(6,2) NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  has_livestock BOOLEAN DEFAULT false,
  eligible_schemes JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.crop_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fertilizer_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yield_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_rotation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pest_disease_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.irrigation_advice ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_scheme_checks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all tables
CREATE POLICY "Users can manage their own crop recommendations" ON public.crop_recommendations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own fertilizer recommendations" ON public.fertilizer_recommendations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own yield predictions" ON public.yield_predictions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own crop rotation plans" ON public.crop_rotation_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own pest disease predictions" ON public.pest_disease_predictions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own irrigation advice" ON public.irrigation_advice FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own government scheme checks" ON public.government_scheme_checks FOR ALL USING (auth.uid() = user_id);
