-- Criar tabela pedidos
CREATE TABLE pedidos (
  id BIGSERIAL PRIMARY KEY,
  usuario_instagram TEXT NOT NULL,
  id_pagamento_externo TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índices para performance
CREATE INDEX idx_pedidos_usuario_instagram ON pedidos(usuario_instagram);
CREATE INDEX idx_pedidos_id_pagamento_externo ON pedidos(id_pagamento_externo);

-- Adicionar RLS (Row Level Security) - boa prática
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;