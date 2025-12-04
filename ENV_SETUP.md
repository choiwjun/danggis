# ============================================
# Database Configuration
# ============================================
# PostgreSQL 연결 문자열
# 형식: postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://postgres:password@localhost:5432/danggolrae?schema=public"

# 예시 (로컬 PostgreSQL):
# DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/danggolrae?schema=public"

# 예시 (Supabase):
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public"

# 예시 (Neon):
# DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"

# 예시 (Railway):
# DATABASE_URL="postgresql://postgres:[password]@[host]:[port]/railway"

# ============================================
# NextAuth Configuration
# ============================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
# 생성 방법: openssl rand -base64 32

# ============================================
# OpenAI API (AI 도우미)
# ============================================
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini" # 또는 gpt-4, gpt-3.5-turbo

# ============================================
# Naver Maps API
# ============================================
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID="your_naver_map_client_id"
# Naver Cloud Platform에서 발급: https://www.ncloud.com/product/applicationService/maps

# ============================================
# Image Storage (Supabase or AWS S3)
# ============================================
# Option 1: Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Option 2: AWS S3
# AWS_ACCESS_KEY_ID="your-access-key"
# AWS_SECRET_ACCESS_KEY="your-secret-key"
# AWS_REGION="ap-northeast-2"
# AWS_S3_BUCKET="danggolrae-images"

# ============================================
# 만세력 API (사주 계산)
# ============================================
# 초기에는 mock API 사용, 나중에 실제 API로 교체
SAJU_API_URL="http://localhost:3000/api/saju/calc"
# SAJU_API_KEY="your-saju-api-key" # 실제 API 사용 시

# ============================================
# Development / Production Mode
# ============================================
NODE_ENV="development" # production, development, test
