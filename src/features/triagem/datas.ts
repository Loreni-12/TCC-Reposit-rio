// Datas "de calendário" no fuso local, sem horário (meia-noite).

export function inicioDoDia(data: Date): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}

/** Converte "AAAA-MM-DD" (valor de <input type="date">) em Date local; null se inválida. */
export function lerDataIso(valor: string): Date | null {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  if (!partes) return null;
  const [ano, mes, dia] = [Number(partes[1]), Number(partes[2]), Number(partes[3])];
  const data = new Date(ano, mes - 1, dia);
  const valida = data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia;
  return valida ? data : null;
}

export function formatarDataIso(data: Date): string {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function somarDias(data: Date, dias: number): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() + dias);
}

/** Soma meses mantendo o dia; se o mês de destino for mais curto, usa o último dia (31/01 + 1 mês = 28 ou 29/02). */
export function somarMeses(data: Date, meses: number): Date {
  const alvo = new Date(data.getFullYear(), data.getMonth() + meses, 1);
  const ultimoDia = new Date(alvo.getFullYear(), alvo.getMonth() + 1, 0).getDate();
  return new Date(alvo.getFullYear(), alvo.getMonth(), Math.min(data.getDate(), ultimoDia));
}

export function idadeEmAnos(dataNascimento: Date, hoje: Date): number {
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const aniversarioAindaNaoChegou =
    hoje.getMonth() < dataNascimento.getMonth() ||
    (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate());
  if (aniversarioAindaNaoChegou) idade -= 1;
  return idade;
}

export function formatarDataBr(data: Date): string {
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
