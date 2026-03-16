from fastapi import FastAPI
app=FastAPI()
@app.get('/health')
def health(): return {'ok':True}
@app.post('/summarize')
def summarize(payload:dict): return {'summary':'todo','evidenceRefs':payload.get('evidenceRefs',[])}
@app.post('/extract-decisions')
def decisions(payload:dict): return {'decisions':[],'evidenceRefs':payload.get('evidenceRefs',[])}
