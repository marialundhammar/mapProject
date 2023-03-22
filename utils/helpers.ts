import { useContext, useState } from 'react';
import DistanceBanner from '../components/ui/atoms/DistanceBanner';
import { ContextStore } from '../context/ContextStore';
import { BarType } from '../types';

interface CalculateDistanceFunctionType {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

interface CalculateUserAndBarType extends CalculateDistanceFunctionType {
  name: string;
}

export const calculateDistanceFunction = ({
  lat1,
  lon1,
  lat2,
  lon2,
}: CalculateDistanceFunctionType) => {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
};

export const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
