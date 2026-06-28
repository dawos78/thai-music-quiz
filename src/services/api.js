// Client-side quiz engine — no backend needed
import ensemblesData from '../data/ensembles.json'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateWrongChoices(correctName) {
  const allInstruments = new Set()
  ensemblesData.ensembles.forEach(ensemble => {
    ensemble.instruments.forEach(inst => {
      if (inst.name !== correctName) {
        allInstruments.add(inst.name)
      }
    })
  })
  return shuffleArray([...allInstruments]).slice(0, 5)
}

function generateEnsembleChoices(correctEnsemble) {
  const sameCat = ensemblesData.ensembles.filter(
    e => e.categoryId === correctEnsemble.categoryId && e.id !== correctEnsemble.id
  )
  const otherCat = ensemblesData.ensembles.filter(
    e => e.categoryId !== correctEnsemble.categoryId
  )

  let wrong = shuffleArray(sameCat).slice(0, 2)
  if (wrong.length < 3) {
    wrong = [...wrong, ...shuffleArray(otherCat).slice(0, 3 - wrong.length)]
  }

  return shuffleArray([
    correctEnsemble.name,
    ...wrong.map(e => e.name)
  ])
}

function generateQuestion(ensemble) {
  const instruments = [...ensemble.instruments]
  const hiddenIndex = Math.floor(Math.random() * instruments.length)
  const hiddenInstrument = instruments[hiddenIndex]
  const visibleInstruments = instruments.filter((_, i) => i !== hiddenIndex)
  const wrongChoices = generateWrongChoices(hiddenInstrument.name)

  const choices = shuffleArray([
    hiddenInstrument.name,
    ...wrongChoices.slice(0, 3)
  ])

  const ensembleChoices = generateEnsembleChoices(ensemble)
  const category = ensemblesData.categories.find(c => c.id === ensemble.categoryId)

  return {
    ensembleId: ensemble.id,
    categoryId: ensemble.categoryId,
    categoryName: category ? category.name : '',
    categoryColor: category ? category.color : '#C9A747',
    description: ensemble.description,
    era: ensemble.era,
    totalInstruments: instruments.length,
    visibleInstruments: visibleInstruments.map(inst => ({
      name: inst.name,
      type: inst.type,
      quantity: inst.quantity
    })),
    hiddenInstrument: {
      name: hiddenInstrument.name,
      type: hiddenInstrument.type,
      quantity: hiddenInstrument.quantity
    },
    instrumentChoices: choices,
    ensembleName: ensemble.name,
    ensembleChoices: ensembleChoices
  }
}

// Public API (same interface as the backend)
export default {
  async getQuestion(categoryId = null) {
    let ensemble
    if (categoryId) {
      const filtered = ensemblesData.ensembles.filter(e => e.categoryId === categoryId)
      ensemble = filtered[Math.floor(Math.random() * filtered.length)]
    } else {
      ensemble = ensemblesData.ensembles[Math.floor(Math.random() * ensemblesData.ensembles.length)]
    }
    return generateQuestion(ensemble)
  },

  async getQuiz(categoryId = null) {
    let ensembles = categoryId
      ? ensemblesData.ensembles.filter(e => e.categoryId === categoryId)
      : ensemblesData.ensembles

    ensembles = shuffleArray(ensembles)
    const questions = ensembles.map(e => generateQuestion(e))

    return {
      totalQuestions: questions.length,
      questions: questions
    }
  },

  async getCategories() {
    return ensemblesData.categories
  },

  async getAllEnsembles() {
    return ensemblesData
  }
}
