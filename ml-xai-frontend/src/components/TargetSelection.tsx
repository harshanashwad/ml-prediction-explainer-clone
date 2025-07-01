
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, ChevronRight, Info } from 'lucide-react';

const TargetSelection = ({ uploadData, onTargetSelected }) => {
  const [selectedTarget, setSelectedTarget] = useState('');

  if (!uploadData || !uploadData.columns) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <Info className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">No upload data available. Please upload a file first.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleTargetSelect = (column) => {
    setSelectedTarget(column);
  };

  const handleContinue = () => {
    if (selectedTarget) {
      onTargetSelected(selectedTarget);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Target className="h-6 w-6 text-blue-600" />
            Select Target Variable
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Choose the column you want to predict (target variable)
          </p>
        </CardHeader>
        <CardContent>
          {/* Dataset Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Dataset Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Rows:</span>
                <span className="ml-2 text-blue-900">{uploadData.shape?.[0] || 'N/A'}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Columns:</span>
                <span className="ml-2 text-blue-900">{uploadData.shape?.[1] || uploadData.columns?.length || 'N/A'}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Missing:</span>
                <span className="ml-2 text-blue-900">{uploadData.missing_values || 0}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Numeric:</span>
                <span className="ml-2 text-blue-900">{uploadData.numeric_columns?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Column Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {uploadData.columns.map((column, index) => {
              const isSelected = selectedTarget === column;
              const isNumeric = uploadData.numeric_columns?.includes(column);
              
              return (
                <button
                  key={index}
                  onClick={() => handleTargetSelect(column)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-102 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                      {column}
                    </span>
                    <div className={`h-2 w-2 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      isNumeric 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {isNumeric ? 'Numeric' : 'Categorical'}
                    </span>
                    {uploadData.sample_values?.[column] && (
                      <span className="text-xs text-gray-500 truncate max-w-20">
                        e.g., {uploadData.sample_values[column]}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedTarget}
              className={`px-8 py-3 text-lg transition-all duration-300 ${
                selectedTarget
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue to Training
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
            {selectedTarget && (
              <p className="text-sm text-gray-600 mt-2 animate-fade-in">
                Selected target: <span className="font-medium text-blue-600">{selectedTarget}</span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetSelection;
