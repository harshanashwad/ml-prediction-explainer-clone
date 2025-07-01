
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Play, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import { trainModel } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';

const ModelTraining = ({ uploadData, onTrainingComplete }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingData, setTrainingData] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState('');
  const { toast } = useToast();

  const startTraining = async () => {
    if (!selectedTarget) {
      toast({
        title: "No target selected",
        description: "Please select a target variable first.",
        variant: "destructive",
      });
      return;
    }

    setIsTraining(true);
    try {
      const result = await trainModel(selectedTarget);
      setTrainingData(result);
      setTrainingComplete(true);
      onTrainingComplete(result);
      toast({
        title: "Training completed!",
        description: `${result.model_type} trained successfully.`,
      });
    } catch (error) {
      console.error('Training error:', error);
      toast({
        title: "Training failed",
        description: error.response?.data?.detail || "Failed to train model.",
        variant: "destructive",
      });
    } finally {
      setIsTraining(false);
    }
  };

  const TrainingAnimation = () => (
    <div className="flex flex-col items-center space-y-4 p-8">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <Brain className="h-8 w-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Training Your Model</h3>
        <p className="text-blue-700">Analyzing data and building ML model...</p>
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600">• Preprocessing features</div>
          <div className="text-sm text-gray-600">• Training algorithm</div>
          <div className="text-sm text-gray-600">• Generating explanations</div>
        </div>
      </div>
    </div>
  );

  const ModelMetrics = ({ data }) => {
    if (!data) return null;

    const isClassification = data.task === 'classification';
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {isClassification ? (
          <>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-700 font-medium">Accuracy</div>
              <div className="text-2xl font-bold text-green-900">{(data.metrics.accuracy * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-blue-700 font-medium">Precision</div>
              <div className="text-2xl font-bold text-blue-900">{(data.metrics.precision * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-purple-700 font-medium">F1 Score</div>
              <div className="text-2xl font-bold text-purple-900">{(data.metrics.f1_score * 100).toFixed(1)}%</div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-700 font-medium">R² Score</div>
              <div className="text-2xl font-bold text-green-900">{(data.metrics.r2 * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-blue-700 font-medium">MAE</div>
              <div className="text-2xl font-bold text-blue-900">{data.metrics.mae.toLocaleString()}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-purple-700 font-medium">MSE</div>
              <div className="text-2xl font-bold text-purple-900">{data.metrics.mse.toLocaleString()}</div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-blue-600" />
            Train ML Model
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Train a machine learning model on your dataset and generate SHAP explanations
          </p>
        </CardHeader>
        <CardContent>
          {!isTraining && !trainingComplete && (
            <div className="text-center">
              {/* Target Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Select Target Variable</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {uploadData?.columns?.map((column, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTarget(column)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedTarget === column
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{column}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={startTraining}
                disabled={!selectedTarget}
                className={`px-8 py-4 text-lg transition-all duration-300 ${
                  selectedTarget
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Training
              </Button>
              {selectedTarget && (
                <p className="text-sm text-gray-600 mt-2">
                  Target: <span className="font-medium text-blue-600">{selectedTarget}</span>
                </p>
              )}
            </div>
          )}

          {isTraining && <TrainingAnimation />}

          {trainingComplete && trainingData && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-2">Training Complete!</h3>
                <p className="text-gray-600">Your {trainingData.model_type} is ready for analysis</p>
              </div>

              {/* Model Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Model Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Model Type:</span>
                    <span className="ml-2 font-medium">{trainingData.model_type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Task:</span>
                    <span className="ml-2 font-medium capitalize">{trainingData.task}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Features Used:</span>
                    <span className="ml-2 font-medium">{trainingData.final_columns?.length || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Training Samples:</span>
                    <span className="ml-2 font-medium">{trainingData.row_count_after_preprocessing}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <ModelMetrics data={trainingData} />

              <div className="text-center mt-8">
                <Button
                  onClick={() => onTrainingComplete(trainingData)}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  View Explanations
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelTraining;
