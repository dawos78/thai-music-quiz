import { ref, computed } from 'vue';
import api from '../services/api';

const GAME_STATES = {
  START: 'start',
  GUESS_INSTRUMENT: 'guess_instrument',
  INSTRUMENT_RESULT: 'instrument_result',
  GUESS_ENSEMBLE: 'guess_ensemble',
  ENSEMBLE_RESULT: 'ensemble_result',
  LOADING: 'loading',
  SUMMARY: 'summary'
};

// Shared state
const gameState = ref(GAME_STATES.START);
const allQuestions = ref([]);
const currentQuestionIndex = ref(0);
const currentQuestion = ref(null);
const score = ref(0);
const streak = ref(0);
const bestStreak = ref(0);
const instrumentCorrect = ref(false);
const ensembleCorrect = ref(false);
const selectedInstrument = ref(null);
const selectedEnsemble = ref(null);
const selectedCategory = ref(null);
const isLoading = ref(false);
const error = ref(null);

// History
const instrumentResult = ref(null);
const ensembleResult = ref(null);
const answersHistory = ref([]);

export function useGame() {
  const totalScore = computed(() => score.value);
  const currentStreak = computed(() => streak.value);
  const maxStreak = computed(() => bestStreak.value);
  const questionsAnswered = computed(() => currentQuestionIndex.value);
  const totalQuestionCount = computed(() => allQuestions.value.length);
  const progressPercent = computed(() => {
    if (allQuestions.value.length === 0) return 0;
    return Math.round((currentQuestionIndex.value / allQuestions.value.length) * 100);
  });

  async function startGame(categoryId = null) {
    selectedCategory.value = categoryId;
    score.value = 0;
    streak.value = 0;
    bestStreak.value = 0;
    currentQuestionIndex.value = 0;
    answersHistory.value = [];

    try {
      isLoading.value = true;
      error.value = null;
      gameState.value = GAME_STATES.LOADING;

      const data = await api.getQuiz(categoryId);
      allQuestions.value = data.questions;

      // Load first question
      setCurrentQuestion(0);
    } catch (err) {
      console.error('Error loading quiz:', err);
      error.value = 'ไม่สามารถโหลดชุดคำถามได้ กรุณาลองใหม่';
      gameState.value = GAME_STATES.START;
    } finally {
      isLoading.value = false;
    }
  }

  function setCurrentQuestion(index) {
    if (index >= allQuestions.value.length) {
      // Quiz finished!
      gameState.value = GAME_STATES.SUMMARY;
      return;
    }

    currentQuestionIndex.value = index;
    currentQuestion.value = allQuestions.value[index];
    selectedInstrument.value = null;
    selectedEnsemble.value = null;
    instrumentCorrect.value = false;
    ensembleCorrect.value = false;
    instrumentResult.value = null;
    ensembleResult.value = null;
    gameState.value = GAME_STATES.GUESS_INSTRUMENT;
  }

  function loadNextQuestion() {
    setCurrentQuestion(currentQuestionIndex.value + 1);
  }

  function selectInstrument(instrument) {
    if (gameState.value !== GAME_STATES.GUESS_INSTRUMENT) return;
    selectedInstrument.value = instrument;
  }

  function submitInstrumentAnswer() {
    if (!selectedInstrument.value || !currentQuestion.value) return;

    const isCorrect = selectedInstrument.value === currentQuestion.value.hiddenInstrument.name;
    instrumentCorrect.value = isCorrect;

    instrumentResult.value = {
      correct: isCorrect,
      selectedAnswer: selectedInstrument.value,
      correctAnswer: currentQuestion.value.hiddenInstrument.name
    };

    if (isCorrect) {
      score.value += 5;
    }

    gameState.value = GAME_STATES.INSTRUMENT_RESULT;

    // Auto advance to ensemble guess
    setTimeout(() => {
      gameState.value = GAME_STATES.GUESS_ENSEMBLE;
    }, 1800);
  }

  function selectEnsemble(ensemble) {
    if (gameState.value !== GAME_STATES.GUESS_ENSEMBLE) return;
    selectedEnsemble.value = ensemble;
  }

  function submitEnsembleAnswer() {
    if (!selectedEnsemble.value || !currentQuestion.value) return;

    const isCorrect = selectedEnsemble.value === currentQuestion.value.ensembleName;
    ensembleCorrect.value = isCorrect;

    ensembleResult.value = {
      correct: isCorrect,
      selectedAnswer: selectedEnsemble.value,
      correctAnswer: currentQuestion.value.ensembleName
    };

    if (isCorrect) {
      score.value += 10;
      streak.value++;
      if (streak.value > bestStreak.value) {
        bestStreak.value = streak.value;
      }
    } else {
      streak.value = 0;
    }

    // Save to history
    answersHistory.value.push({
      questionIndex: currentQuestionIndex.value,
      ensembleName: currentQuestion.value.ensembleName,
      instrumentCorrect: instrumentCorrect.value,
      ensembleCorrect: isCorrect,
      bothCorrect: instrumentCorrect.value && isCorrect,
    });

    gameState.value = GAME_STATES.ENSEMBLE_RESULT;
  }

  function goToStart() {
    gameState.value = GAME_STATES.START;
    currentQuestion.value = null;
    allQuestions.value = [];
  }

  return {
    // Constants
    GAME_STATES,

    // State
    gameState,
    currentQuestion,
    allQuestions,
    currentQuestionIndex,
    isLoading,
    error,
    selectedInstrument,
    selectedEnsemble,
    instrumentCorrect,
    ensembleCorrect,
    instrumentResult,
    ensembleResult,
    answersHistory,

    // Computed
    totalScore,
    currentStreak,
    maxStreak,
    questionsAnswered,
    totalQuestionCount,
    progressPercent,

    // Actions
    startGame,
    loadNextQuestion,
    selectInstrument,
    submitInstrumentAnswer,
    selectEnsemble,
    submitEnsembleAnswer,
    goToStart
  };
}
