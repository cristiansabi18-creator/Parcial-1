import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


const TAREAS_POR_HOJA = 10;

const tareasIniciales = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  texto: `Tarea de ejemplo ${i + 1}`,
  completada: i % 4 === 0,
}));

export default function ListaTareas() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [texto, setTexto] = useState("");
  const [hoja, setHoja] = useState(1);

  function agregarTarea(e) {
    e.preventDefault();
    if (texto.trim() === "") return;

    const nuevaTarea = {
      id: Date.now(),
      texto: texto.trim(),
      completada: false,
    };

    setTareas([nuevaTarea, ...tareas]);
    setTexto("");
    setHoja(1);
  }

  function toggleCompletada(id) {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  }

  function borrarTarea(id) {
    const restantes = tareas.filter((t) => t.id !== id);
    setTareas(restantes);

    const totalHojas = Math.max(
      1,
      Math.ceil(restantes.length / TAREAS_POR_HOJA)
    );

    if (hoja > totalHojas) setHoja(totalHojas);
  }

  const totalHojas = Math.max(
    1,
    Math.ceil(tareas.length / TAREAS_POR_HOJA)
  );

  const inicio = (hoja - 1) * TAREAS_POR_HOJA;

  const tareasDeHoja = tareas.slice(
    inicio,
    inicio + TAREAS_POR_HOJA
  );

  const completadas = tareas.filter((t) => t.completada).length;

  const porcentaje =
    tareas.length === 0
      ? 0
      : Math.round((completadas / tareas.length) * 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #ecfeff 100%)",
        fontFamily:
          "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* ENCABEZADO */}

        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 6px",
                color: "#6366f1",
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Mi organización
            </p>

            <h1
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "34px",
                fontWeight: "800",
                letterSpacing: "-1px",
              }}
            >
              Lista de tareas
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#6b7280",
                fontSize: "15px",
              }}
            >
              Organiza tus actividades y lleva el control de tu progreso.
            </p>
          </div>

          {/* ESTADÍSTICA */}

          <div
            style={{
              background: "#ffffff",
              padding: "15px 20px",
              borderRadius: "16px",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
              border: "1px solid #e5e7eb",
              minWidth: "150px",
            }}
          >
            <div
              style={{
                color: "#6b7280",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              PROGRESO
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "5px",
                marginTop: "3px",
              }}
            >
              <strong
                style={{
                  fontSize: "26px",
                  color: "#111827",
                }}
              >
                {porcentaje}%
              </strong>

              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "12px",
                }}
              >
                completado
              </span>
            </div>
          </div>
        </div>

        {/* TARJETA PRINCIPAL */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.10)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          {/* BARRA SUPERIOR */}

          <div
            style={{
              padding: "22px 28px",
              background:
                "linear-gradient(90deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Tus tareas
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  opacity: 0.8,
                }}
              >
                {tareas.length} tareas registradas
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {completadas} de {tareas.length} completadas
            </div>
          </div>

          {/* FORMULARIO */}

          <form
            onSubmit={agregarTarea}
            style={{
              padding: "22px 28px",
              background: "#f8fafc",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="¿Qué necesitas hacer?"
                style={{
                  flex: 1,
                  padding: "14px 17px",
                  border: "1px solid #dbe1ea",
                  borderRadius: "12px",
                  background: "#ffffff",
                  color: "#111827",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="submit"
                style={{
                  padding: "0 22px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 5px 15px rgba(99,102,241,0.25)",
                }}
              >
                + Agregar
              </button>
            </div>
          </form>

          {/* LISTA */}

          <div
            style={{
              padding: "10px 20px 15px",
              minHeight: "390px",
              boxSizing: "border-box",
            }}
          >
            {tareasDeHoja.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "100px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "12px",
                  }}
                >
                  📋
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  No hay tareas en esta hoja
                </p>

                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  Agrega una nueva tarea para comenzar.
                </p>
              </div>
            )}

            {tareasDeHoja.map((tarea, idx) => (
              <div
                key={tarea.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "17px 12px",
                  borderBottom:
                    idx === tareasDeHoja.length - 1
                      ? "none"
                      : "1px solid #f1f5f9",
                  transition: "all 0.2s ease",
                }}
              >
                {/* CHECK */}

                <button
                  onClick={() => toggleCompletada(tarea.id)}
                  aria-label="Marcar como completada"
                  style={{
                    width: "24px",
                    height: "24px",
                    minWidth: "24px",
                    border: tarea.completada
                      ? "none"
                      : "2px solid #cbd5e1",
                    borderRadius: "8px",
                    background: tarea.completada
                      ? "#6366f1"
                      : "#ffffff",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    boxShadow: tarea.completada
                      ? "0 3px 8px rgba(99,102,241,0.3)"
                      : "none",
                  }}
                >
                  {tarea.completada ? "✓" : ""}
                </button>

                {/* TEXTO */}

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: tarea.completada
                        ? "#9ca3af"
                        : "#1f2937",
                      textDecoration: tarea.completada
                        ? "line-through"
                        : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tarea.texto}
                  </span>

                  <div
                    style={{
                      marginTop: "4px",
                      color: tarea.completada
                        ? "#a5b4fc"
                        : "#94a3b8",
                      fontSize: "11px",
                    }}
                  >
                    {tarea.completada
                      ? "Tarea completada"
                      : "Pendiente"}
                  </div>
                </div>

                {/* BORRAR */}

                <button
                  onClick={() => borrarTarea(tarea.id)}
                  aria-label="Borrar tarea"
                  style={{
                    border: "none",
                    background: "#fff1f2",
                    color: "#e11d48",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "8px 11px",
                    borderRadius: "8px",
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* PAGINACIÓN */}

          {totalHojas > 1 && (
            <div
              style={{
                padding: "18px 28px",
                borderTop: "1px solid #e5e7eb",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              <button
                onClick={() =>
                  setHoja((h) => Math.max(1, h - 1))
                }
                disabled={hoja === 1}
                style={{
                  border: "1px solid #e2e8f0",
                  background:
                    hoja === 1 ? "#f1f5f9" : "#ffffff",
                  color:
                    hoja === 1 ? "#cbd5e1" : "#475569",
                  padding: "9px 14px",
                  borderRadius: "9px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor:
                    hoja === 1 ? "default" : "pointer",
                }}
              >
                ← Anterior
              </button>

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                {Array.from(
                  { length: totalHojas },
                  (_, i) => i + 1
                ).map((num) => (
                  <button
                    key={num}
                    onClick={() => setHoja(num)}
                    style={{
                      width: "34px",
                      height: "34px",
                      border: "none",
                      borderRadius: "9px",
                      background:
                        num === hoja
                          ? "#6366f1"
                          : "#ffffff",
                      color:
                        num === hoja
                          ? "#ffffff"
                          : "#64748b",
                      fontSize: "13px",
                      fontWeight:
                        num === hoja ? "700" : "500",
                      cursor: "pointer",
                      boxShadow:
                        num === hoja
                          ? "0 4px 10px rgba(99,102,241,0.25)"
                          : "none",
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setHoja((h) =>
                    Math.min(totalHojas, h + 1)
                  )
                }
                disabled={hoja === totalHojas}
                style={{
                  border: "1px solid #e2e8f0",
                  background:
                    hoja === totalHojas
                      ? "#f1f5f9"
                      : "#ffffff",
                  color:
                    hoja === totalHojas
                      ? "#cbd5e1"
                      : "#475569",
                  padding: "9px 14px",
                  borderRadius: "9px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor:
                    hoja === totalHojas
                      ? "default"
                      : "pointer",
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>

        {/* PIE */}

        <div
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          Hoja {hoja} de {totalHojas} · Mostrando hasta{" "}
          {TAREAS_POR_HOJA} tareas
        </div>
      </div>
    </div>
  );
}

