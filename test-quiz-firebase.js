// =====================================================
// TESTE DO SISTEMA DE QUIZ + FIREBASE
// =====================================================
// Como usar:
// 1. Abra quiz.html no navegador
// 2. Abra o DevTools Console (F12)
// 3. Cole este script e pressione Enter
// =====================================================

(async function testQuizFirebase() {
  console.log('🧪 INICIANDO TESTE DO QUIZ + FIREBASE');
  console.log('=====================================');

  // 1. Verificar se usuário está logado
  console.log('\n📋 PASSO 1: Verificar sessão do usuário');
  const userSession = sessionStorage.getItem('pethologyUser');

  if (!userSession) {
    console.error('❌ ERRO: Nenhum usuário logado!');
    console.log('👉 Vá para auth0-login.html e faça login primeiro');
    return;
  }

  const user = JSON.parse(userSession);
  console.log('✅ Usuário logado:', user.name);
  console.log('   User ID:', user.id);

  // 2. Verificar Firebase Service
  console.log('\n📋 PASSO 2: Verificar Firebase Service');
  try {
    const { PethologyFirebaseService } = await import('./assets/js/firebase-service.js');
    console.log('✅ Firebase Service carregado!');

    // 3. Testar leitura do progresso
    console.log('\n📋 PASSO 3: Carregar progresso atual');
    const progress = await PethologyFirebaseService.getStudentProgress(user.id);
    console.log('✅ Progresso carregado:');
    console.table({
      'Total Quizzes': progress.overallStats.totalQuizzes,
      'Average Score': `${Math.round(progress.overallStats.averageScore * 100)}%`,
      'Streak': progress.overallStats.streak,
      'Total Time': `${Math.round(progress.overallStats.totalTimeSpent / 60)} min`
    });

    console.log('\n📊 Progresso por Módulo:');
    Object.entries(progress.moduleProgress).forEach(([module, data]) => {
      console.log(`   ${module}: ${data.completion}% completo`);
    });

    // 4. Simular resultado de quiz
    console.log('\n📋 PASSO 4: Simular resultado de quiz de Biology');
    const mockQuizResult = {
      userId: user.id,
      quizId: 'Biology',
      type: 'normal',
      score: 0.85, // 85%
      totalQuestions: 10,
      correctAnswers: 8,
      timeSpent: 120, // 2 minutos
      completedAt: new Date(),
      answers: [
        { question: 'Test Q1', selectedAnswer: 1, correctAnswer: 1, isCorrect: true },
        { question: 'Test Q2', selectedAnswer: 0, correctAnswer: 0, isCorrect: true },
        // ... mais respostas
      ]
    };

    console.log('📝 Dados do quiz simulado:', mockQuizResult);

    // 5. Salvar no Firebase
    console.log('\n📋 PASSO 5: Salvar resultado no Firebase');
    const resultId = await PethologyFirebaseService.saveQuizResult(mockQuizResult);
    console.log('✅ Resultado salvo com ID:', resultId);

    // 6. Carregar progresso atualizado
    console.log('\n📋 PASSO 6: Carregar progresso atualizado');
    const updatedProgress = await PethologyFirebaseService.getStudentProgress(user.id);
    console.log('✅ Novo progresso:');
    console.table({
      'Total Quizzes': updatedProgress.overallStats.totalQuizzes,
      'Average Score': `${Math.round(updatedProgress.overallStats.averageScore * 100)}%`,
      'Streak': updatedProgress.overallStats.streak,
      'Total Time': `${Math.round(updatedProgress.overallStats.totalTimeSpent / 60)} min`
    });

    // 7. Verificar achievements
    console.log('\n📋 PASSO 7: Verificar achievements');
    if (updatedProgress.achievements.length > 0) {
      console.log('🏆 Achievements desbloqueados:', updatedProgress.achievements);
    } else {
      console.log('📝 Nenhum achievement desbloqueado ainda');
      console.log('   Complete 10 quizzes para desbloquear "Quiz Master"');
      console.log('   Tire 100% em um quiz para desbloquear "Perfect Score"');
    }

    console.log('\n✅ =============================================');
    console.log('✅ TESTE COMPLETO! Sistema funcionando! 🎉');
    console.log('✅ =============================================');
    console.log('\n📌 PRÓXIMOS PASSOS:');
    console.log('   1. Vá para quiz.html e faça um quiz de verdade');
    console.log('   2. Volte para student-dashboard.html');
    console.log('   3. Veja suas estatísticas atualizadas!');

  } catch (error) {
    console.error('❌ ERRO no teste:', error);
    console.log('💡 Verifique se firebase-service.js existe e está configurado');
  }
})();
