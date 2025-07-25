// src/services/authService.ts

export async function login(userId: string, password: string) {
  const response = await fetch('http://192.168.0.16:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password }),
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  const data = await response.json();
  return data.token; // JWT 토큰 반환
}
