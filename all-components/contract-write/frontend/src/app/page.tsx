"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useAbiParser } from "@/hooks/useAbiParser";
import { useContractWrite } from "@/hooks/useContractWrite";
import { parseAbiFunction } from "@/lib/abiParser";
import { Abi } from "viem";



export default function ContractWritePage() {
    const [contractAddress, setContractAddress] = useState('');
    const [abiInput, setAbiInput] = useState('');
    const [parsedAbi, setParsedAbi] = useState<Abi | null>(null);
    const [selectedFunction, setSelectedFunction] = useState<string>('');
    const [functionParams, setFunctionParams] = useState<Record<string, any>>({});


    const {address, isConnected} = useAccount();
    const {writeFunctions} = useAbiParser(parsedAbi);
    const {executeFunction, txHash, isPending, error, isSuccess} = useContractWrite();

    const handleParseAbi = () => {
        try {
            const parsed = JSON.parse(abiInput);
            setParsedAbi(parsed);
            setSelectedFunction('');
            setFunctionParams({});
        } catch (err) {
            alert("Invalid ABI JSON!");
        }
    }

    const handleExecute = async () => {
        if (!parsedAbi || !selectedFunction || !contractAddress) {
            alert("fill all fields");
            return;
        }

        const func = writeFunctions.find((f) => f.name === selectedFunction);
        if (!func) return;

        const args = func.inputs.map((input) => functionParams[input.name || '']);

        await executeFunction(contractAddress, parsedAbi, selectedFunction, args);
    }


    const getInputFields = () => {
        const func = writeFunctions.find((f) => f.name=== selectedFunction);
        if (!func) return[];
        return parseAbiFunction(func);
    }
                                                                                                                                                                                            
    return (                                                                                                                                                                                          
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>                                                                                                                       
        <h2>Contract Write Form</h2>                                                                                                                                                                  
                                                                                                                                                                                                      
        {!isConnected && (                                                                                                                                                                            
          <p style={{ color: 'orange' }}>⚠️ Connect wallet first</p>                                                                                                                                  
        )}                                                                                                                                                                                            
                                                                                                                                                                                                      
        <div style={{ marginBottom: '1rem' }}>                                                                                                                                                        
          <label>Contract Address:</label>                                                                                                                                                            
          <input                                                                                                                                                                                      
            type="text"                                                                                                                                                                               
            value={contractAddress}                                                                                                                                                                   
            onChange={(e) => setContractAddress(e.target.value)}                                                                                                                                      
            placeholder="0x..."                                                                                                                                                                       
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}                                                                                                                        
          />                                                                                                                                                                                          
        </div>                                                                                                                                                                                         
        <div style={{ marginBottom: '1rem' }}>                                                                                                                                                        
          <label>ABI JSON:</label>                                                                                                                                                                    
          <textarea                                                                                                                                                                                   
            value={abiInput}                                                                                                                                                                          
            onChange={(e) => setAbiInput(e.target.value)}                                                                                                                                             
            placeholder='[{"type":"function","name":"mint",...}]'                                                                                                                                     
            rows={8}                                                                                                                                                                                  
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}                                                                                                                        
          />                                                                                                                                                                                          
          <button onClick={handleParseAbi} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>                                                                                                   
            Parse ABI                                                                                                                                                                                 
          </button>                                                                                                                                                                                   
        </div>                                                                                                                                                                                        
                                                                                                                                                                                                      
        {writeFunctions.length > 0 && (                                                                                                                                                               
          <div style={{ marginBottom: '1rem' }}>                                                                                                                                                      
            <label>Select Function:</label>                                                                                                                                                           
            <select                                                                                                                                                                                   
              value={selectedFunction}                                                                                                                                                                
              onChange={(e) => {                                                                                                                                                                      
                setSelectedFunction(e.target.value);                                                                                                                                                  
                setFunctionParams({});                                                                                                                          
              }}                                                                                                                                                                                      
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}                                                                                                                      
            >                                                                                                                                                                                         
              <option value="">-- Choose function --</option>                                                                                                                                         
              {writeFunctions.map((func) => (                                                                                                                                                         
                <option key={func.name} value={func.name}>                                                                                                                                            
                  {func.name}                                                                                                                                                                         
                </option>                                                                                                                                                                             
              ))}                                                                                                                                                                                     
            </select>                                                                                                                                                                                 
          </div>                                                                                                                                                                                      
        )}                                                                                                                                                                                            
                                                                                                                                                                                                          
        {selectedFunction && getInputFields().map((field, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <label>{field.name} ({field.type}):</label>
            <input
              type="text"
              value={functionParams[field.name] || ''}
              onChange={(e) => setFunctionParams({ ...functionParams, [field.name]: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
        ))}                                                                                                                                                                                           
                                                                                                                                                                                                       
        {selectedFunction && (                                                                                                                                                                        
          <button                                                                                                                                                                                     
            onClick={handleExecute}                                                                                                                                                                   
            disabled={!isConnected || isPending}                                                                                                                                                      
            style={{                                                                                                                                                                                  
              width: '100%',                                                                                                                                                                          
              padding: '0.75rem',                                                                                                                                                                     
              background: isPending ? '#ccc' : '#0070f3',                                                                                                                                             
              color: '#fff',                                                                                                                                                                          
              border: 'none',                                                                                                                                                                         
              cursor: isPending ? 'not-allowed' : 'pointer',                                                                                                                                          
            }}                                                                                                                                                                                        
          >                                                                                                                                                                                           
            {isPending ? 'Executing...' : 'Execute Transaction'}                                                                                                                                      
          </button>                                                                                                                                                                                   
        )}                                                                                                                                                                                            
                                                                                                                                                                                                         
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>❌ Error: {error}</p>}                                                                                                               
        {isSuccess && <p style={{ color: 'green', marginTop: '1rem' }}>✅ Success!</p>}                                                                                                               
        {txHash && (                                                                                                                                                                                  
          <p style={{ marginTop: '1rem' }}>                                                                                                                                                           
            📝 Transaction: <code>{txHash}</code>                                                                                                                                                     
          </p>                                                                                                                                                                                        
        )}                                                                                                                                                                                            
      </div>                                                                                                                                                                                          
    );     
}