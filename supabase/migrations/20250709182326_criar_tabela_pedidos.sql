-- Criar tabela pedidos
CREATE TABLE pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    valor DECIMAL(10,2) DEFAULT 10.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario);
CREATE INDEX idx_pedidos_session_id ON pedidos(session_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);